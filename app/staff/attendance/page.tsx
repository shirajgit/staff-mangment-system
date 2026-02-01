"use client";

import { useState } from "react";
import { getCurrentLocation } from "@/utils/geo";

export default function MarkAttendancePage() {
  const [msg, setMsg] = useState("");

  const mark = async () => {
    try {
      setMsg("Getting your location...");
      const loc = await getCurrentLocation();

      if (loc.accuracy > 80) {
        setMsg("Location accuracy low. Window ke paas jao & try again.");
        return;
      }

      setMsg("Marking attendance...");
      const res = await fetch("/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ cookie send
        body: JSON.stringify(loc),
      });

      const data = await res.json();
      setMsg(data?.message || "Done");
    } catch (e: any) {
      setMsg(e?.message || "Failed");
    }
  };

  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Staff Attendance</h1>
      <button onClick={mark} className="mt-4 px-4 py-2 rounded bg-black text-white">
        Mark Attendance
      </button>
      <p className="mt-3 text-sm">{msg}</p>
    </main>
  );
}
