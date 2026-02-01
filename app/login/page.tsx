"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      setMsg("🔐 Logging in...");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: "Invalid server response" };
      }

      if (!res.ok) {
        setMsg(data?.message || `Login failed (${res.status}) ❌`);
        return;
      }

      setMsg(`Welcome ${data.name} ✅`);
      r.push("/staff/attendance");
    } catch (err: any) {
      setMsg(err?.message || "Network error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070a12] flex items-center justify-center px-4">
      <div
        className="relative w-full max-w-md rounded-2xl
                   bg-white/[0.04] backdrop-blur
                   border border-white/10
                   shadow-[0_0_30px_rgba(34,211,238,0.15)]
                   p-6"
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2
                     w-64 h-64 bg-cyan-400/10 blur-3xl"
        />

        {/* Header */}
        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
        <p className="text-sm text-white/60 mt-1">
          Login to continue to your dashboard
        </p>

        {/* Email */}
        <div className="mt-6">
          <label className="text-sm text-white/70 mb-1 block">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-4 py-2
                       bg-white/5 text-white
                       border border-white/10
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-white/70 mb-1 block">
              Password
            </label>

            {/* Optional: forgot password */}
            <Link
              href="/forgot-password"
              className="text-xs text-white/50 hover:text-cyan-300 transition"
            >
              Forgot?
            </Link>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-2
                       bg-white/5 text-white
                       border border-white/10
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full mt-6 rounded-xl
                     bg-gradient-to-r from-cyan-400 to-blue-500
                     text-black font-semibold py-2.5
                     hover:opacity-90 transition
                     disabled:opacity-60 disabled:cursor-not-allowed
                     shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Create account */}
        <Link
          href="/signup"
          className="block mt-3 w-full text-center rounded-xl
                     border border-white/15 bg-white/[0.03]
                     text-white/85 py-2.5
                     hover:bg-white/5 transition"
        >
          Create new account
        </Link>

        {/* Message */}
        {msg && (
          <p
            className={`mt-4 text-sm text-center ${
              msg.includes("❌") ? "text-red-400" : "text-cyan-300"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </main>
  );
}
