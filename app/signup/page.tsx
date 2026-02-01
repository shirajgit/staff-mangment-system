"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const r = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      setMsg("📝 Creating account...");

      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const text = await res.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: "Invalid server response" };
      }

      if (!res.ok) {
        setMsg(data?.message || `Signup failed (${res.status}) ❌`);
        setLoading(false);
        return;
      }

      setMsg(`Welcome ${data.name || name} ✅`);
      r.push("/staff/attendance"); // or "/login"
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
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2
                        w-64 h-64 bg-cyan-400/10 blur-3xl" />

        {/* Header */}
        <h1 className="text-2xl font-bold text-white">
          Create Account
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Join the platform to start marking attendance
        </p>

        {/* Name */}
        <div className="mt-6">
          <label className="text-sm text-white/70 mb-1 block">
            Full name
          </label>
          <input
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg px-4 py-2
                       bg-white/5 text-white
                       border border-white/10
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Email */}
        <div className="mt-4">
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
          <label className="text-sm text-white/70 mb-1 block">
            Password
          </label>
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

        {/* Primary Button */}
        <button
          onClick={signup}
          disabled={loading}
          className="w-full mt-6 rounded-xl
                     bg-gradient-to-r from-cyan-400 to-blue-500
                     text-black font-semibold py-2.5
                     hover:opacity-90 transition
                     disabled:opacity-60 disabled:cursor-not-allowed
                     shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Secondary Button */}
        <button
          onClick={() => r.push("/login")}
          className="w-full mt-3 rounded-xl
                     border border-white/15
                     text-white/80 py-2.5
                     hover:bg-white/5 transition"
        >
          Already have an account? Login
        </button>

        {/* Message */}
        {msg && (
          <p
            className={`mt-4 text-sm text-center ${
              msg.includes("❌")
                ? "text-red-400"
                : "text-cyan-300"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </main>
  );
}
