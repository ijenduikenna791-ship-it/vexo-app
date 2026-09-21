const fs = require("fs");
const path = require("path");

const files = {
  "app/lib/auth.js": `const USERS_KEY = "vexo_users";
const SESSION_KEY = "vexo_session";
const ADMIN_SESSION_KEY = "vexo_admin_session";
const ADMIN_EMAIL = "admin@vexo.com";
const ADMIN_PASSWORD = "admin123";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function getUsers() {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(USERS_KEY)) || [];
}

export function signup({ username, email, phone, country, password }) {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "An account with this email already exists." };
  }
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: "That username is already taken." };
  }
  const newUser = { username, email, phone, country, password };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  localStorage.setItem(SESSION_KEY, JSON.stringify({ username, email, phone, country }));
  return { success: true };
}

export function login({ email, password }) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ username: user.username, email: user.email, phone: user.phone, country: user.country })
  );
  return { success: true };
}

export function getSession() {
  if (typeof window === "undefined") return null;
  return safeParse(localStorage.getItem(SESSION_KEY));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
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
`,

  "app/signup/page.js": `"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff, IconBrandGoogleFilled, IconBrandApple, IconArrowRight } from "@tabler/icons-react";
import { signup } from "../lib/auth";

const countries = [
  "United States", "United Kingdom", "Canada", "Nigeria", "Ghana", "Kenya", "South Africa",
  "India", "Pakistan", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden",
  "Australia", "New Zealand", "Brazil", "Mexico", "Argentina", "Japan", "South Korea",
  "China", "Singapore", "United Arab Emirates", "Saudi Arabia", "Egypt", "Turkey",
  "Philippines", "Indonesia", "Vietnam", "Poland", "Ireland", "Switzerland",
];

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const progress = step === 1 ? 50 : 100;

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signup(form);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-vexo-orange flex items-center justify-center text-white font-bold text-lg">V</div>
          <p className="text-xl font-extrabold">Vexo</p>
        </div>

        <h1 className="text-2xl font-extrabold text-center">Create your account</h1>
        <p className="text-vexo-muted text-sm text-center mt-2">Join 248,000+ crypto traders on Vexo</p>

        <div className="w-full h-1 bg-vexo-border rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-vexo-orange rounded-full transition-all duration-300"
            style={{ width: \`\${progress}%\` }}
          />
        </div>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleContinue} className="flex flex-col gap-5 mt-8">
            <div>
              <label className="text-sm font-semibold">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Choose a username"
                required
                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Country</label>
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange appearance-none"
              >
                <option value="" disabled>Select your country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Phone number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 555 123 4567"
                required
                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
              />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold flex items-center justify-center gap-2">
              Continue <IconArrowRight size={18} />
            </button>

            <div className="flex items-center gap-3 text-vexo-muted text-xs">
              <div className="flex-1 h-px bg-vexo-border" />
              or sign up with
              <div className="flex-1 h-px bg-vexo-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 bg-vexo-card border border-vexo-border rounded-xl py-3 text-sm font-semibold">
                <IconBrandGoogleFilled size={16} /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 bg-vexo-card border border-vexo-border rounded-xl py-3 text-sm font-semibold">
                <IconBrandApple size={16} /> Apple
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCreateAccount} className="flex flex-col gap-5 mt-8">
            <p className="text-sm text-vexo-muted">
              Almost done, <span className="text-white font-semibold">{form.username || "there"}</span> — just set a password.
            </p>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="w-full bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-vexo-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-vexo-muted"
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Confirm password</label>
              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  required
                  minLength={6}
                  className="w-full bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-vexo-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-vexo-muted"
                >
                  {showConfirm ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
              <p className="text-vexo-muted text-xs mt-2">Must be at least 8 characters.</p>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold">
              Create Free Account
            </button>

            <button type="button" onClick={() => setStep(1)} className="text-vexo-muted text-sm font-semibold">
              ← Back
            </button>
          </form>
        )}

        <p className="text-vexo-muted text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-vexo-orange font-semibold">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
`,
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Created:", relativePath);
}

console.log("\nDone! Signup now collects username, email, country, phone (step 1) and password + confirm password (step 2).");
