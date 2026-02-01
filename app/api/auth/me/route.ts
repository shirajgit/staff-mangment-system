import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const auth = await getAuthUser(); // ✅ FIX

  if (!auth) {
    return NextResponse.json({ ok: false, message: "Not logged in" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findById(auth.id).select("name email role");
  return NextResponse.json({ ok: true, user });
}
