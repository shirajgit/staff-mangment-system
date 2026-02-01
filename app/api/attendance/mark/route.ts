import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Office from "@/models/Office";
import Attendance from "@/models/Attendance";
import { haversineMeters } from "@/utils/distance";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req : Request) {
  const auth = await getAuthUser();
  if (!auth) {
    return NextResponse.json({ ok: false, message: "Not logged in" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const lat = Number(body?.lat);
  const lng = Number(body?.lng);
  const accuracy = Number(body?.accuracy ?? 999);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ ok: false, message: "Invalid location" }, { status: 400 });
  }

  const office = await Office.findOne();
  if (!office) {
    return NextResponse.json({ ok: false, message: "Office location not set" }, { status: 400 });
  }

  const distance = haversineMeters(lat, lng, office.lat, office.lng);
  if (distance > office.radiusMeters) {
    return NextResponse.json(
      { ok: false, message: `Outside office range (${Math.round(distance)} m)` },
      { status: 403 }
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  // ✅ Correct: get current user name
  const user = await User.findById(auth.id).select("name");
  if (!user) {
    return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
  }

  try {
    await Attendance.create({
      staffId: auth.id,
      staffName: user.name,  
      date: today,
      status: "P",
      checkIn: new Date(),
      location: { lat, lng },
      accuracy,
      distanceMeters: distance,
      method: "GEOFENCE",
    });

    return NextResponse.json({ ok: true, message: `Attendance marked for ${user.name} ✅` });
  } catch {
    return NextResponse.json({ ok: false, message: "Already marked today" }, { status: 409 });
  }
}
