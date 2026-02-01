import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  const auth = getAuthUser();
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 });

  await connectDB();
  const user = await User.findById(auth.id).select("name email role");
  return NextResponse.json({ ok: true, user });
}
