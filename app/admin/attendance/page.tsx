"use client";

import React, { useEffect, useMemo, useState } from "react";

type Row = {
  _id: string;
  staffName: string;
  checkIn: string;
  distanceMeters: number;
};

function Badge({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "error" | "success";
}) {
  const cls =
    tone === "error"
      ? "border-red-400/30 bg-red-500/10 text-red-200"
      : tone === "success"
      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
      : "border-cyan-400/30 bg-cyan-500/10 text-cyan-200";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}

export default function AdminAttendancePage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [msg, setMsg] = useState("Loading...");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // ✅ YYYY-MM-DD

  useEffect(() => {
    const load = async () => {
      try {
        setMsg("Loading...");
        setError("");

        const res = await fetch("/api/attendance/all", {
          credentials: "include",
          cache: "no-store",
        });

        const text = await res.text();
        let data: any = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = { message: "Invalid server response" };
        }

        if (!res.ok) {
          setRows([]);
          setMsg("");

          // ✅ CUSTOM MESSAGE FOR ADMIN-ONLY
          if (res.status === 403) {
            setError("🚫 Only admin can access this page");
          } else {
            setError(data?.message || "Failed to load attendance.");
          }
          return;
        }

        setRows(data.list || []);
        setMsg("");
      } catch (e: any) {
        setRows([]);
        setMsg("");
        setError(e?.message || "Network error. Please try again.");
      }
    };

    load();
  }, []);

  // ✅ FILTER BY DATE (local date in YYYY-MM-DD)
  const filteredRows = useMemo(() => {
    if (!selectedDate) return rows;

    return rows.filter((r) => {
      // Convert checkIn to local date string YYYY-MM-DD
      const d = new Date(r.checkIn);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const localDate = `${yyyy}-${mm}-${dd}`;

      return localDate === selectedDate;
    });
  }, [rows, selectedDate]);

  const total = filteredRows.length;

  const avgDistance = useMemo(() => {
    if (!filteredRows.length) return 0;
    const sum = filteredRows.reduce(
      (acc, r) => acc + (Number(r.distanceMeters) || 0),
      0
    );
    return Math.round(sum / filteredRows.length);
  }, [filteredRows]);

  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      {/* Top gradient header */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Today Attendance
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Live check-ins with distance verification.
              </p>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <Badge tone={msg ? "info" : error ? "error" : "success"}>
                {msg ? msg : error ? "Error" : "Loaded"}
              </Badge>

              {/* ✅ DATE FILTER */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
                <p className="text-xs text-white/60 mb-1">Filter by date</p>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm text-white outline-none"
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate("")}
                    className="ml-3 text-xs text-cyan-300 hover:text-cyan-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
                <p className="text-xs text-white/60">Total</p>
                <p className="text-lg font-semibold">{total}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
                <p className="text-xs text-white/60">Avg Distance</p>
                <p className="text-lg font-semibold">{avgDistance} m</p>
              </div>
            </div>
          </div>

          {selectedDate && (
            <p className="mt-3 text-xs text-white/50">
              Showing records for:{" "}
              <span className="text-white">{selectedDate}</span>
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Error state */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-200">
            <p className="text-sm font-medium">
              {error.includes("Only admin") ? "Access denied" : "Couldn’t load attendance"}
            </p>
            <p className="mt-1 text-sm text-red-200/80">{error}</p>
          </div>
        )}

        {/* Empty state (after load) */}
        {!msg && !error && filteredRows.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-lg font-semibold">
              {selectedDate ? "No attendance found" : "No attendance marked yet"}
            </p>
            <p className="mt-1 text-sm text-white/60">
              {selectedDate
                ? "No check-ins for selected date."
                : "Once staff check in, entries will appear here."}
            </p>
          </div>
        )}

        {/* Table Card */}
        {filteredRows.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_30px_rgba(34,211,238,0.08)] overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
              <p className="font-semibold">Check-ins</p>
              <p className="text-xs text-white/60">
                Showing <span className="text-white">{filteredRows.length}</span> entries
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/[0.02]">
                  <tr className="text-left text-xs uppercase tracking-wider text-white/60">
                    <th className="px-5 py-3">Staff</th>
                    <th className="px-5 py-3">Check-in</th>
                    <th className="px-5 py-3">Distance</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRows.map((r, idx) => {
                    const dist = Math.round(Number(r.distanceMeters) || 0);
                    const status =
                      dist <= 50 ? "success" : dist <= 120 ? "info" : "error";

                    return (
                      <tr
                        key={r._id}
                        className={`border-t border-white/5 hover:bg-white/[0.02] transition ${
                          idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-200 text-sm font-bold">
                              {r.staffName?.trim()?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div>
                              <p className="font-medium">{r.staffName}</p>
                              <p className="text-xs text-white/50">
                                ID: {r._id.slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-white/80">
                          {new Date(r.checkIn).toLocaleString()}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold">{dist} m</span>
                            <Badge tone={status}>
                              {status === "success"
                                ? "Within range"
                                : status === "info"
                                ? "Near range"
                                : "Out of range"}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 border-t border-white/10 text-xs text-white/50">
              Tip: If distance is too high, ask staff to enable GPS high accuracy
              and stand near the office window.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
