import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// In production move to Vercel Env: ADMIN_EASTER_ID / ADMIN_EASTER_HASH
const EASTER_ID = process.env.ADMIN_EASTER_ID || "31";
const EASTER_HASH = process.env.ADMIN_EASTER_HASH || bcrypt.hashSync(process.env.ADMIN_EASTER_PWD || "ldldld", 10);

// simple in-memory rate limit (use Upstash Redis in prod for millions)
const attempts = new Map<string, { count: number; first: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && now - entry.first < 60_000 && entry.count >= 5) {
    return NextResponse.json({ error: "Trop de tentatives, réessayez dans 1 minute" }, { status: 429 });
  }

  const { id, password } = await req.json();
  if (!id || !password) return NextResponse.json({ error: "ID et mot de passe requis" }, { status: 400 });

  const idOk = String(id).trim() === String(EASTER_ID).trim();
  const pwdOk = bcrypt.compareSync(String(password), EASTER_HASH);

  if (!idOk || !pwdOk) {
    const cur = attempts.get(ip) || { count: 0, first: now };
    if (now - cur.first > 60_000) {
      attempts.set(ip, { count: 1, first: now });
    } else {
      attempts.set(ip, { count: cur.count + 1, first: cur.first });
    }
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  // success: clear attempts and set cookie
  attempts.delete(ip);
  const res = NextResponse.json({ success: true });
  // HttpOnly cookie for admin session (7 days)
  res.cookies.set("hk_admin", "dz", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
