"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    try {
      setMsg("Logging in...");

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
        setMsg(data?.message || `Login failed (${res.status})`);
        return;
      }

      setMsg(`Welcome ${data.name} ✅`);
      r.push("/staff/attendance");
    } catch (err: any) {
      setMsg(err?.message || "Network error");
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border w-full mt-4 p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border w-full mt-3 p-2 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login} className="mt-4 w-full bg-black text-white py-2 rounded">
        Login
      </button>

      <p className="mt-3 text-sm">{msg}</p>
    </main>
  );
}
