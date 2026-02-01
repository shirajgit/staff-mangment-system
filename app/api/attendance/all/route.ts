import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const auth = await getAuthUser();

  if (!auth || auth.role !== "admin") {
    return NextResponse.json(
      { ok: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  await connectDB();

  const today = new Date().toISOString().slice(0, 10);

  const list = await Attendance.find({ date: today })
    .sort({ createdAt: -1 })
    // ✅ If you store name directly
    .select("staffName checkIn distanceMeters date");

    // OR (better) if you use populate:
    // .populate("staffId", "name email")
    // .select("staffId checkIn distanceMeters date");

  return NextResponse.json({ ok: true, list });
}
