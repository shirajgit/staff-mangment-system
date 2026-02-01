import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Office from "@/models/Office";

export async function GET() {
  await connectDB();
  const office = await Office.findOne();
  return NextResponse.json({ ok: true, office });
}

export async function POST(req: Request) {
  await connectDB();
  const { lat, lng, radiusMeters } = await req.json();

  const _lat = Number(lat);
  const _lng = Number(lng);
  const _rad = Number(radiusMeters ?? 150);

  if (!Number.isFinite(_lat) || !Number.isFinite(_lng)) {
    return NextResponse.json({ ok: false, message: "Invalid lat/lng" }, { status: 400 });
  }

  await Office.deleteMany({});
  const office = await Office.create({ lat: _lat, lng: _lng, radiusMeters: _rad });

  return NextResponse.json({ ok: true, message: "Office saved ✅", office });
}
