import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// Mock in-memory store (replace with Prisma + Supabase for prod)
const orders: any[] = [];

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = rateLimit(`orders:${ip}`, 10, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });

  const body = await req.json();
  // basic zod-like check
  if (!body.phone || !body.name) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });

  const code8 = body.code8 || Math.random().toString(36).substring(2, 10).toUpperCase();
  const order = { id: Date.now().toString(), code8, status: "PENDING", ...body, createdAt: new Date().toISOString() };
  orders.push(order);
  console.log("[orders] new", code8);
  return NextResponse.json({ success: true, code8, order });
}

export async function GET() {
  return NextResponse.json({ orders });
}
