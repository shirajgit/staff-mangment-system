"use client";

import { useState } from "react";
import { getCurrentLocation } from "@/utils/geo";

export default function OfficePage() {
  const [radius, setRadius] = useState(150);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    try {
      setLoading(true);
      setMsg("📍 Getting GPS location...");

      const loc = await getCurrentLocation();

      const res = await fetch("/api/office", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          lat: loc.lat,
          lng: loc.lng,
          radiusMeters: radius,
        }),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      setLoading(false);

      // ✅ ADMIN-ONLY HANDLING
      if (!res.ok) {
        if (res.status === 403) {
          setMsg("🚫 Only admin can Make this Change");
        } else {
          setMsg(data?.message || "Failed to save office location ❌");
        }
        return;
      }

      setMsg(data?.message || "Office location saved successfully ✅");
    } catch (e: any) {
      setLoading(false);
      setMsg( "Failed to get GPS. Please allow location access ❌");
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
          Office Location
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Set the office GPS location and allowed radius for attendance.
        </p>

        {/* Radius Input */}
        <div className="mt-6">
          <label className="text-sm text-white/70 mb-1 block">
            Allowed Radius (meters)
          </label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full rounded-lg px-4 py-2
                       bg-white/5 text-white
                       border border-white/10
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <p className="text-xs text-white/50 mt-1">
            Example: 100–200 meters recommended
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={save}
          disabled={loading}
          className="w-full mt-6 rounded-xl
                     bg-gradient-to-r from-cyan-400 to-blue-500
                     text-black font-semibold py-2.5
                     hover:opacity-90 transition
                     disabled:opacity-60 disabled:cursor-not-allowed
                     shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        >
          {loading ? "Fetching GPS..." : "Get GPS & Save"}
        </button>

        {/* Status Message */}
        {msg && (
          <p
            className={`mt-4 text-sm text-center ${
              msg.includes("Only admin") || msg.includes("🚫")
                ? "text-red-400"
                : msg.includes("Failed") || msg.includes("❌")
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
