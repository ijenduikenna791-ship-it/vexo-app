"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff, IconBrandGoogleFilled, IconBrandApple, IconArrowRight } from "@tabler/icons-react";
import { signup } from "../lib/auth";

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const progress = step === 1 ? 50 : 100;

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError("");
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
            style={{ width: `${progress}%` }}
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
              <label className="text-sm font-semibold">Full name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
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
              Almost done, <span className="text-white font-semibold">{form.name || "there"}</span> — just set a password.
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
