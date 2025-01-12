import { NextRequest, NextResponse } from "next/server";

export default function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  if (
    !token &&
    !["/auth/login", "/auth/register", "/auth/check"].includes(
      req.nextUrl.pathname
    )
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
