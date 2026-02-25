import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const res = NextResponse.redirect(new URL("/admin/login", url.origin), 302);
  res.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return res;
}
