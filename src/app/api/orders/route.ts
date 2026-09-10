import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// Mock in-memory store (replace with Prisma + Supabase for prod) + 3 demo clients for admin preview
const demoOrders = [
  {
    id: "demo1",
    code8: "HK7A9P2Q",
    status: "PENDING",
    nom: "Benali",
    prenom: "Amine",
    phone: "0555123456",
    wilaya: "Alger",
    address: "Bab Ezzouar Cité 5 Juillet",
    extra: "Bât A3",
    wantsHome: true,
    deliveryAddress: "Bab Ezzouar, Alger - Livraison domicile",
    isLarge: false,
    name: "Shoes Nike - 50 paires",
    qty: 50,
    unitPrice: 2800,
    length: "30",
    width: "20",
    height: "15",
    weight: "12",
    grossisteCount: "",
    dismantlable: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "demo2",
    code8: "HK3M8X1Z",
    status: "PENDING",
    nom: "Khaled",
    prenom: "Youcef",
    phone: "0660123456",
    wilaya: "Oran",
    address: "Bir El Djir Zone Eco",
    extra: "Hangar 7",
    wantsHome: false,
    deliveryAddress: "",
    isLarge: true,
    name: "Machine presse hydraulique démontable",
    qty: 1,
    unitPrice: 450000,
    length: "180",
    width: "120",
    height: "150",
    weight: "850",
    grossisteCount: "3",
    dismantlable: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "demo3",
    code8: "HK9B2K4L",
    status: "VALIDATED",
    nom: "Meriem",
    prenom: "Sarah",
    phone: "0770123456",
    wilaya: "Sétif",
    address: "Zone Industrielle Sétif",
    extra: "",
    wantsHome: true,
    deliveryAddress: "Sétif Centre - Livraison",
    isLarge: false,
    name: "Trousse maquillage + robes - 120 pcs",
    qty: 120,
    unitPrice: 1200,
    length: "60",
    width: "40",
    height: "30",
    weight: "25",
    grossisteCount: "",
    dismantlable: false,
    negotiationPrice: 1350,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
];

const orders: any[] = [...demoOrders];

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = rateLimit(`orders:${ip}`, 10, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });

  const body = await req.json();
  if (!body.phone || !body.name) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });

  const code8 = body.code8 || Math.random().toString(36).substring(2, 10).toUpperCase();
  const order = { id: Date.now().toString(), code8, status: "PENDING", ...body, createdAt: new Date().toISOString() };
  orders.unshift(order);
  console.log("[orders] new", code8);
  return NextResponse.json({ success: true, code8, order });
}

export async function GET() {
  return NextResponse.json({ orders });
}
