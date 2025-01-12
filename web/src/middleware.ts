import { NextRequest, NextResponse as res } from "next/server";
import checkMiddleware from "./middlewares/auth/check";
import authMiddleware from "./middlewares/auth";

export function middleware(req: NextRequest) {
  const checkResponse = checkMiddleware(req);
  if (checkResponse) return checkResponse;
  const authResponse = authMiddleware(req);
  if (authResponse) return authResponse;

  return res.next();
}

export const config = {
  matcher: ["/", "/:path", "/auth/:path"],
};