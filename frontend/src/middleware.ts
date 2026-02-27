import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname === "/admin/setup") return NextResponse.next();

  const token = request.cookies.get("authToken")?.value;
  if (!token) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Decode JWT to check expiry and role without a library
  const payload = decodeJwtPayload(token);
  if (!payload) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Check token expiry
  const exp = payload.exp as number | undefined;
  if (exp && Date.now() / 1000 > exp) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    const res = NextResponse.redirect(url);
    res.cookies.set("authToken", "", { maxAge: 0, path: "/" });
    return res;
  }

  // Staff cannot access staff management page
  if (pathname.startsWith("/admin/staff") && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/dashboard",
    "/admin/blogs/:path*",
    "/admin/messages",
    "/admin/settings",
    "/admin/staff",
    "/admin/staff/:path*",
    "/admin/categories/:path*",
    "/admin/subcategories/:path*",
  ],
};
