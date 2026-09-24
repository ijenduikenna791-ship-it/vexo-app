import { supabase } from "./supabaseClient";

const SESSION_KEY = "vexo_session";
const ADMIN_SESSION_KEY = "vexo_admin_session";
const PENDING_REFERRAL_KEY = "vexo_pending_referral";
const ADMIN_EMAIL = "admin@vexo.com";
const ADMIN_PASSWORD = "admin123";

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
  if (existing) return existing;

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

  saveSession({
    id: authUser.id,
    username: profile?.username || authUser.user_metadata?.username || "",
    email: authUser.email,
    phone: profile?.phone || "",
    country: profile?.country || "",
  });
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

export function adminLogin({ email, password }) {
  if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email }));
    return { success: true };
  }
  return { success: false, error: "Invalid admin credentials." };
}

export function getAdminSession() {
  if (typeof window === "undefined") return null;
  return safeParse(localStorage.getItem(ADMIN_SESSION_KEY));
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
