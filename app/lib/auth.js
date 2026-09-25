import { supabase } from "./supabaseClient";

const SESSION_KEY = "vexo_session";
const ADMIN_SESSION_KEY = "vexo_admin_session";
const PENDING_REFERRAL_KEY = "vexo_pending_referral";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function saveSession(sessionData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

function notifyEmail(type, email, username) {
  if (typeof window === "undefined" || !email) return;
  fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, email, username }),
  }).catch(() => {});
}

function generateReferralCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Legacy stub kept so any old import of getUsers() does not crash the build.
// Real user accounts now live in Supabase Auth + the profiles table.
export function getUsers() {
  return [];
}

async function ensureProfile(authUser, meta) {
  const { data: existing } = await supabase.from("profiles").select("*").eq("id", authUser.id).maybeSingle();
  if (existing) {
    const needsPhone = !existing.phone && meta.phone;
    const needsCountry = !existing.country && meta.country;
    if (needsPhone || needsCountry) {
      const { data: patched } = await supabase
        .from("profiles")
        .update({
          phone: needsPhone ? meta.phone : existing.phone,
          country: needsCountry ? meta.country : existing.country,
        })
        .eq("id", authUser.id)
        .select()
        .maybeSingle();
      return patched || existing;
    }
    return existing;
  }

  let referredBy = null;
  let pendingCode = null;
  if (typeof window !== "undefined") {
    pendingCode = localStorage.getItem(PENDING_REFERRAL_KEY);
  }
  if (pendingCode) {
    const { data: referrer } = await supabase
      .from("profiles")
      .select("id")
      .eq("referral_code", pendingCode)
      .maybeSingle();
    if (referrer) referredBy = referrer.id;
  }

  let myCode = generateReferralCode();
  let profile = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data: inserted, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: authUser.id,
        username: meta.username || "",
        email: authUser.email,
        phone: meta.phone || "",
        country: meta.country || "",
        referral_code: myCode,
        referred_by: referredBy,
        is_admin: false,
        kyc_status: "none",
        status: "active",
      })
      .select()
      .maybeSingle();
    if (!insertError) {
      profile = inserted;
      break;
    }
    if (insertError.message && insertError.message.toLowerCase().includes("referral_code")) {
      myCode = generateReferralCode();
      continue;
    }
    break;
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem(PENDING_REFERRAL_KEY);
  }
  return profile;
}

export async function signup({ username, email, phone, country, password, referralCode }) {
  if (referralCode && typeof window !== "undefined") {
    localStorage.setItem(PENDING_REFERRAL_KEY, referralCode.trim().toUpperCase());
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username, phone, country } },
  });

  if (error) {
    return { success: false, error: error.message || "Could not create account." };
  }

  const authUser = data.user;
  if (!authUser) {
    return { success: false, error: "Could not create account. Please try again." };
  }

  if (!data.session) {
    return { success: true, needsConfirmation: true };
  }

  await ensureProfile(authUser, { username, phone, country });
  saveSession({ id: authUser.id, username, email, phone, country });
  return { success: true };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { success: false, error: "Invalid email or password." };
  }

  const authUser = data.user;
  const profile = await ensureProfile(authUser, {
    username: authUser.user_metadata?.username,
    phone: authUser.user_metadata?.phone,
    country: authUser.user_metadata?.country,
  });

  if (profile?.two_factor_enabled) {
    await supabase.auth.signOut();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    if (otpError) {
      return { success: false, error: "Could not send your verification code. Please try again." };
    }
    return { success: true, needsTwoFactor: true, email };
  }

  saveSession({
    id: authUser.id,
    username: profile?.username || authUser.user_metadata?.username || "",
    email: authUser.email,
    phone: profile?.phone || "",
    country: profile?.country || "",
  });
  notifyEmail("login", authUser.email, profile?.username);
  return { success: true };
}

export async function verifyTwoFactorCode({ email, code }) {
  const { data, error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
  if (error) {
    return { success: false, error: "Invalid or expired code. Please try again." };
  }

  const authUser = data.user;
  const profile = await ensureProfile(authUser, {
    username: authUser.user_metadata?.username,
    phone: authUser.user_metadata?.phone,
    country: authUser.user_metadata?.country,
  });

  saveSession({
    id: authUser.id,
    username: profile?.username || authUser.user_metadata?.username || "",
    email: authUser.email,
    phone: profile?.phone || "",
    country: profile?.country || "",
  });
  notifyEmail("login", authUser.email, profile?.username);
  return { success: true };
}

export async function completePasskeyLogin(authUser) {
  const profile = await ensureProfile(authUser, {
    username: authUser.user_metadata?.username,
    phone: authUser.user_metadata?.phone,
    country: authUser.user_metadata?.country,
  });

  saveSession({
    id: authUser.id,
    username: profile?.username || authUser.user_metadata?.username || "",
    email: authUser.email,
    phone: profile?.phone || "",
    country: profile?.country || "",
  });
  notifyEmail("login", authUser.email, profile?.username);
  return { success: true };
}

export function getSession() {
  if (typeof window === "undefined") return null;
  return safeParse(localStorage.getItem(SESSION_KEY));
}

export async function logout() {
  await supabase.auth.signOut();
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export async function adminLogin({ email, password }) {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Invalid admin credentials." };
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(data.admin));
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: "Could not sign in. Please try again." };
  }
}

export function setAdminSession(admin) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin));
}

export function getAdminSession() {
  if (typeof window === "undefined") return null;
  return safeParse(localStorage.getItem(ADMIN_SESSION_KEY));
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
