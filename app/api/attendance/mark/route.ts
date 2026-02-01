import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";
import Office from "@/models/Office";
import Attendance from "@/models/Attendance";
import { haversineMeters } from "@/utils/distance";

export async function POST(req: Request) {
  const auth = getAuthUser();
  if (!auth) return NextResponse.json({ ok: false, message: "Not logged in" }, { status: 401 });

  await connectDB();
  const { lat, lng, accuracy } = await req.json();

  const _lat = Number(lat);
  const _lng = Number(lng);
  const _acc = Number(accuracy ?? 999);

  if (!Number.isFinite(_lat) || !Number.isFinite(_lng)) {
    return NextResponse.json({ ok: false, message: "Invalid location" }, { status: 400 });
  }
  if (_acc > 80) {
    return NextResponse.json({ ok: false, message: "Accuracy too low" }, { status: 400 });
  }

  const office = await Office.findOne();
  if (!office) return NextResponse.json({ ok: false, message: "Office not set" }, { status: 400 });

  const dist = haversineMeters(_lat, _lng, office.lat, office.lng);
  if (dist > office.radiusMeters) {
    return NextResponse.json(
      { ok: false, message: `Outside office range (${Math.round(dist)}m)` },
      { status: 403 }
    );
  }

  const user = await User.findById(auth.id).select("name role");
  if (!user) return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });

  const today = new Date().toISOString().slice(0, 10);

  try {
    await Attendance.create({
      staffId: user._id,
      staffName: user.name,
      date: today,
      status: "P",
      checkIn: new Date(),
      location: { lat: _lat, lng: _lng },
      accuracy: _acc,
      distanceMeters: dist,
      method: "GEOFENCE",
    });

    return NextResponse.json({ ok: true, message: `Attendance marked for ${user.name} ✅`, name: user.name });
  } catch {
    return NextResponse.json({ ok: false, message: "Already marked today" }, { status: 409 });
  }
}
