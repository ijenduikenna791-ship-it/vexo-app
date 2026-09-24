const fs = require("fs");
const path = require("path");

const files = {
  "app/signup/page.js": `"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff, IconBrandGoogleFilled, IconBrandApple, IconArrowRight } from "@tabler/icons-react";
import { signup } from "../lib/auth";

const countries = [
  { name: "United States", flag: "🇺🇸", dial: "+1", placeholder: "555 123 4567" },
  { name: "United Kingdom", flag: "🇬🇧", dial: "+44", placeholder: "7911 123456" },
  { name: "Canada", flag: "🇨🇦", dial: "+1", placeholder: "416 555 0123" },
  { name: "Nigeria", flag: "🇳🇬", dial: "+234", placeholder: "803 123 4567" },
  { name: "Ghana", flag: "🇬🇭", dial: "+233", placeholder: "24 123 4567" },
  { name: "Kenya", flag: "🇰🇪", dial: "+254", placeholder: "712 345 678" },
  { name: "South Africa", flag: "🇿🇦", dial: "+27", placeholder: "71 123 4567" },
  { name: "India", flag: "🇮🇳", dial: "+91", placeholder: "98765 43210" },
  { name: "Pakistan", flag: "🇵🇰", dial: "+92", placeholder: "300 1234567" },
  { name: "Germany", flag: "🇩🇪", dial: "+49", placeholder: "151 12345678" },
  { name: "France", flag: "🇫🇷", dial: "+33", placeholder: "6 12 34 56 78" },
  { name: "Spain", flag: "🇪🇸", dial: "+34", placeholder: "612 345 678" },
  { name: "Italy", flag: "🇮🇹", dial: "+39", placeholder: "312 345 6789" },
  { name: "Netherlands", flag: "🇳🇱", dial: "+31", placeholder: "6 12345678" },
  { name: "Sweden", flag: "🇸🇪", dial: "+46", placeholder: "70 123 45 67" },
  { name: "Australia", flag: "🇦🇺", dial: "+61", placeholder: "412 345 678" },
  { name: "New Zealand", flag: "🇳🇿", dial: "+64", placeholder: "21 123 4567" },
  { name: "Brazil", flag: "🇧🇷", dial: "+55", placeholder: "11 91234 5678" },
  { name: "Mexico", flag: "🇲🇽", dial: "+52", placeholder: "55 1234 5678" },
  { name: "Argentina", flag: "🇦🇷", dial: "+54", placeholder: "9 11 1234 5678" },
  { name: "Japan", flag: "🇯🇵", dial: "+81", placeholder: "90 1234 5678" },
  { name: "South Korea", flag: "🇰🇷", dial: "+82", placeholder: "10 1234 5678" },
  { name: "China", flag: "🇨🇳", dial: "+86", placeholder: "138 0013 8000" },
  { name: "Singapore", flag: "🇸🇬", dial: "+65", placeholder: "8123 4567" },
  { name: "United Arab Emirates", flag: "🇦🇪", dial: "+971", placeholder: "50 123 4567" },
  { name: "Saudi Arabia", flag: "🇸🇦", dial: "+966", placeholder: "50 123 4567" },
  { name: "Egypt", flag: "🇪🇬", dial: "+20", placeholder: "100 123 4567" },
  { name: "Turkey", flag: "🇹🇷", dial: "+90", placeholder: "501 234 56 78" },
  { name: "Philippines", flag: "🇵🇭", dial: "+63", placeholder: "917 123 4567" },
  { name: "Indonesia", flag: "🇮🇩", dial: "+62", placeholder: "812 3456 789" },
  { name: "Vietnam", flag: "🇻🇳", dial: "+84", placeholder: "91 234 56 78" },
  { name: "Poland", flag: "🇵🇱", dial: "+48", placeholder: "512 345 678" },
  { name: "Ireland", flag: "🇮🇪", dial: "+353", placeholder: "85 123 4567" },
  { name: "Switzerland", flag: "🇨🇭", dial: "+41", placeholder: "78 123 45 67" },
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
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const selectedCountry = countries.find((c) => c.name === form.country);
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

    const fullPhone = \`\${selectedCountry ? selectedCountry.dial : ""} \${form.phoneNumber}\`.trim();
    const result = signup({ ...form, phone: fullPhone });
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
                onChange={(e) => setForm({ ...form, country: e.target.value, phoneNumber: "" })}
                required
                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange appearance-none"
              >
                <option value="" disabled>Select your country</option>
                {countries.map((c) => (
                  <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Phone number</label>
              <div className="flex mt-2">
                <span className="flex items-center gap-1.5 bg-vexo-card2 border border-vexo-border border-r-0 rounded-l-xl px-3 text-sm text-vexo-muted whitespace-nowrap">
                  {selectedCountry ? \`\${selectedCountry.flag} \${selectedCountry.dial}\` : "🌐 +__"}
                </span>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  placeholder={selectedCountry ? selectedCountry.placeholder : "Select a country first"}
                  required
                  className="w-full bg-vexo-card border border-vexo-border rounded-r-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
                />
              </div>
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

console.log("\nDone! Country dropdown now shows flags, and the phone field shows a live country-code prefix with a country-specific placeholder.");
