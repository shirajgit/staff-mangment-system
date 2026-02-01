// lib/auth.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} missing in .env.local`);
  return v;
}

const JWT_SECRET = mustEnv("JWT_SECRET");

// 🔐 payload type
export type AuthPayload = {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
};

// ✅ SIGN TOKEN (LOGIN ke time use hota hai)
export function signToken(payload: { id: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// ✅ GET AUTH USER (API protection ke liye)
export async function getAuthUser(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (typeof decoded !== "object" || !decoded.id || !decoded.role) {
      return null;
    }

    return decoded as AuthPayload;
  } catch {
    return null;
  }
}
