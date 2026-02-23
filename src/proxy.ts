import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt/auth";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.redirect(new URL("/login", req.url));

  // Example: restrict admin routes
  if (req.nextUrl.pathname.startsWith("/admin") && payload.vRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
