"use client";

import { useState } from "react";
import { getCurrentLocation } from "@/utils/geo";

export default function OfficePage() {
  const [radius, setRadius] = useState(150);
  const [msg, setMsg] = useState("");

  const save = async () => {
    setMsg("Getting GPS...");
    const loc = await getCurrentLocation();

    const res = await fetch("/api/office", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ lat: loc.lat, lng: loc.lng, radiusMeters: radius }),
    });
    const data = await res.json();
    setMsg(data?.message || "Done");
  };

  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Set Office Location</h1>
      <input className="border w-full mt-4 p-2 rounded" type="number"
        value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
      <button onClick={save} className="mt-4 bg-black text-white px-4 py-2 rounded">
        Get GPS & Save
      </button>
      <p className="mt-3 text-sm">{msg}</p>
    </main>
  );
}

