import { NextRequest, NextResponse } from "next/server";

export default function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  if (
    !token &&
    ![
      "/auth/login",
      "/auth/register",
      "/auth/check",
      "/auth/forgot-password",
      "/auth/reset-password",
    ].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (
    token &&
    [
      "/auth/login",
      "/auth/register",
      "/auth/check",
      "/auth/forgot-password",
      "/auth/reset-password",
    ].includes(req.nextUrl.pathname)
  )
    return NextResponse.redirect(new URL("/", req.url));
}
