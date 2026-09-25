"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff, IconFingerprint, IconBrandGoogleFilled, IconBrandApple } from "@tabler/icons-react";
import { login, verifyTwoFactorCode } from "../lib/auth";
import { loginWithPasskey } from "../lib/webauthnClient";

export default function Login() {
  const router = useRouter();
  const [stage, setStage] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);
    if (result.success) {
      if (result.needsTwoFactor) {
        setPendingEmail(result.email);
        setInfo("We emailed you a 6-digit verification code.");
        setStage("twoFactor");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.error);
    }
  };

  const handleBiometricLogin = async () => {
    setError("");
    setInfo("");
    setLoading(true);
    const result = await loginWithPasskey();
    setLoading(false);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await verifyTwoFactorCode({ email: pendingEmail, code });
    setLoading(false);
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
          <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">V</div>
          <p className="text-lg font-extrabold">Vexo</p>
        </div>

        {stage === "password" && (
          <>
            <h1 className="text-3xl font-extrabold text-center">Welcome back</h1>
            <p className="text-vexo-muted text-sm text-center mt-2">Sign in to your Vexo account</p>

            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
              <div>
                <label className="text-sm font-semibold">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">Password</label>
                  <Link href="/forgot-password" className="text-vexo-orange text-xs font-semibold">Forgot password?</Link>
                </div>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
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

              <label className="flex items-center gap-2 text-sm text-vexo-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="w-4 h-4 accent-vexo-orange"
                />
                Remember me for 30 days
              </label>

              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? "Signing in..." : <>Sign In <span>→</span></>}
              </button>

              <button
                type="button"
                onClick={handleBiometricLogin}
                disabled={loading}
                className="flex items-center justify-center gap-2 text-vexo-orange text-sm font-semibold disabled:opacity-60"
              >
                <IconFingerprint size={18} /> Sign in with biometrics
              </button>

              <div className="flex items-center gap-3 text-vexo-muted text-xs">
                <div className="flex-1 h-px bg-vexo-border" />
                or continue with
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

            <p className="text-vexo-muted text-sm text-center mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-vexo-orange font-semibold">Create one free</Link>
            </p>
          </>
        )}

        {stage === "twoFactor" && (
          <>
            <h1 className="text-3xl font-extrabold text-center">Verify it's you</h1>
            <p className="text-vexo-muted text-sm text-center mt-2">Enter the verification code we sent to {pendingEmail}</p>

            {info && (
              <div className="mt-6 bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">
                {info}
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="flex flex-col gap-5 mt-6">
              <div>
                <label className="text-sm font-semibold">Verification code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value.trim())}
                  placeholder="Enter code"
                  required
                  maxLength={12}
                  className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-center text-2xl tracking-widest outline-none focus:border-vexo-orange"
                />
              </div>

              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60">
                {loading ? "Verifying..." : "Verify and Sign In"}
              </button>

              <button type="button" onClick={() => { setStage("password"); setError(""); setInfo(""); }} className="text-vexo-muted text-sm font-semibold">
                Back to sign in
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
