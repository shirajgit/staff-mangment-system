import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Office from "@/models/Office";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const office = await Office.findOne();
  return NextResponse.json({ ok: true, office });
}

export async function POST(req) {
  // ✅ admin check
  const auth = await getAuthUser();
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const lat = Number(body.lat);
  const lng = Number(body.lng);
  const radiusMeters = Number(body.radiusMeters ?? 150);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ ok: false, message: "Invalid lat/lng" }, { status: 400 });
  }

  await Office.deleteMany({});
  const office = await Office.create({ lat, lng, radiusMeters });

  return NextResponse.json({ ok: true, message: "Office saved ✅", office });
}
