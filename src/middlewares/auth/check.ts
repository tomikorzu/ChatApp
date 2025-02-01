import { NextRequest, NextResponse } from "next/server";

export default function checkMiddleware(req: NextRequest) {
  const emailCheck = req.cookies.get("email-check");

  if (!emailCheck && req.nextUrl.pathname === "/auth/check") {
    return NextResponse.redirect(new URL("/auth/register", req.url));
  } else if (emailCheck && req.nextUrl.pathname !== "/auth/check")
    return NextResponse.redirect(new URL("/auth/check", req.url));
}
