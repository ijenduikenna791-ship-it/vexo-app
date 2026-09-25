"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const redirectTo = window.location.origin + "/reset-password";
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (error) {
      setError("Could not send reset email. Please try again.");
    } else {
      setSent(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="w-8 h-8 rounded-lg bg-vexo-orange flex items-center justify-center text-white font-bold">V</div>
          <p className="text-lg font-extrabold">Vexo</p>
        </div>

        <h1 className="text-3xl font-extrabold text-center">Reset your password</h1>
        <p className="text-vexo-muted text-sm text-center mt-2">Enter your account email and we will send you a link to reset your password.</p>

        {sent ? (
          <div className="mt-6 bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3 text-center">
            Check your email for a link to reset your password.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}
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
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60">
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="text-vexo-muted text-sm text-center mt-6">
          Remembered your password?{" "}
          <Link href="/login" className="text-vexo-orange font-semibold">Back to sign in</Link>
        </p>
      </div>
    </main>
  );
}
