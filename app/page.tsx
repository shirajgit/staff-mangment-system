import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type TokenPayload = {
  id: string;
  role: "admin" | "staff";
};

export default async function HomePage() {
  const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as TokenPayload;

    if (user.role === "admin") {
      redirect("/admin/office");
    }

    redirect("/staff/attendance");
  } catch {
    redirect("/login");
  }
}
