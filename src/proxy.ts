import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin/dz") || path.startsWith("/admin/cn")) {
    const admin = req.cookies.get("hk_admin")?.value;
    if (!admin) {
      return NextResponse.redirect(new URL("/admin/login?easter=1", req.url));
    }
    // CN trying to access DZ or vice versa - allow but dashboard will filter
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
