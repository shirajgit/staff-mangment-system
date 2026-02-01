"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const r = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const signup = async () => {
    try {
      setMsg("Creating account...");

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
        setMsg(data?.message || `Signup failed (${res.status})`);
        return;
      }

      setMsg(`Welcome ${data.name || name} ✅`);
      // signup ke baad direct dashboard ya login page
      r.push("/staff/attendance"); // or: r.push("/login");
    } catch (err: any) {
      setMsg(err?.message || "Network error");
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p className="text-sm text-gray-500 mt-1">Create your account</p>

      <input
        className="border w-full mt-4 p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border w-full mt-3 p-2 rounded"
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

      <button
        onClick={signup}
        className="mt-4 w-full bg-black text-white py-2 rounded"
      >
        Create Account
      </button>

      <button
        onClick={() => r.push("/login")}
        className="mt-3 w-full border py-2 rounded"
      >
        Already have an account? Login
      </button>

      <p className="mt-3 text-sm">{msg}</p>
    </main>
  );
}
