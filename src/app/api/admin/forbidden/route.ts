import { NextResponse } from "next/server";
import { forbiddenDefaults } from "@/lib/forbidden";

let rules: any[] = [...forbiddenDefaults.map((r, i) => ({ id: String(i + 1), ...r }))];

export async function GET() {
  return NextResponse.json({ rules });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.reason) return NextResponse.json({ error: "Nom et raison requis" }, { status: 400 });
  const nw = { id: Date.now().toString(), name: body.name, reason: body.reason, isDismantlableRequired: !!body.isDismantlableRequired };
  rules.push(nw);
  return NextResponse.json({ success: true, rule: nw });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  rules = rules.filter(r => r.id !== id);
  return NextResponse.json({ success: true });
}
