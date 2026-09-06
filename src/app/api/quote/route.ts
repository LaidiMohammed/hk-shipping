import { NextResponse } from "next/server";

export async function POST(req: Request){
  const body = await req.json();
  console.log("Quote request:", body);
  // In production, send email via Resend/Nodemailer here
  // await resend.emails.send({...})
  return NextResponse.json({ success: true, message: "Quote received" });
}
