"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff, IconShieldLock } from "@tabler/icons-react";
import { adminLogin } from "../../lib/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = adminLogin({ email, password });
    if (result.success) {
      router.push("/admin");
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

        <div className="flex items-center justify-center gap-2 mb-2">
          <IconShieldLock size={16} className="text-vexo-orange" />
          <p className="text-vexo-orange text-xs font-semibold uppercase tracking-wide">Admin Portal</p>
        </div>
        <h1 className="text-2xl font-extrabold text-center">Admin Sign In</h1>
        <p className="text-vexo-muted text-sm text-center mt-2">Authorized personnel only</p>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
          <div>
            <label className="text-sm font-semibold">Admin email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vexo.com"
              required
              className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
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

          <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold">
            Sign In to Admin
          </button>
        </form>

        <p className="text-vexo-muted text-xs text-center mt-6">
          This portal is restricted to Vexo staff. Unauthorized access attempts are logged.
        </p>
        <p className="text-vexo-muted text-xs text-center mt-2">
          Demo credentials: admin@vexo.com / admin123
        </p>
      </div>
    </main>
  );
}
