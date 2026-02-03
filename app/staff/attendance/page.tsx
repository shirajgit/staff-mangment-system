"use client";
import { useState } from "react";
import { getCurrentLocation } from "@/utils/geo";
import Link from "next/link";

export default function MarkAttendancePage() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const mark = async () => {
    try {
      setLoading(true);
      setMsg("📍 Getting your location...");

      const loc = await getCurrentLocation();

      // ⚠️ Only warning, no block
      if (loc.accuracy > 200) {
        setMsg("⚠️ GPS accuracy is low (laptop). Distance check will be applied...");
      } else {
        setMsg("Location detected. Marking attendance...");
      }

      const res = await fetch("/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loc),
      });

      // ✅ Safe parse
      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: "Invalid server response" };
      }

      setMsg(data?.message || "Attendance marked ✅");
    } catch (e: any) {
      setMsg(e?.message || "Failed to mark attendance ❌");
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
        <h1 className="text-2xl font-bold text-white">
          Staff Attendance
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Mark your attendance using live GPS location
        </p>

        {/* Action Button */}
        <button
          onClick={mark}
          disabled={loading}
          className="w-full mt-8 rounded-xl
                     bg-gradient-to-r from-cyan-400 to-blue-500
                     text-black font-semibold py-3
                     hover:opacity-90 transition
                     disabled:opacity-60 disabled:cursor-not-allowed
                     shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        >
          {loading ? "Marking Attendance..." : "Mark Attendance"}
        </button>

        {/* Status Message */}
        {msg && (
          <p
            className={`mt-4 text-sm text-center ${
              msg.includes("❌")
                ? "text-red-400"
                : msg.includes("⚠️")
                ? "text-yellow-400"
                : "text-cyan-300"
            }`}
          >
            {msg}
          </p>
        )}

        {/* Admin Link */}
        <div className="mt-6 text-center">
          <Link
            href="/admin/office"
            className="text-sm text-white/60 hover:text-cyan-400 transition"
          >
            Go to Admin Panel →
          </Link>
        </div>
      </div>
    </main>
  );
}
