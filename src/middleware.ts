import { NextRequest, NextResponse as res } from "next/server";

import authMiddleware from "./middlewares/auth";
import checkMiddleware from "./middlewares/auth/check";

export function middleware(req: NextRequest) {
  const checkResponse = checkMiddleware(req);
  if (checkResponse) return checkResponse;
  const authResponse = authMiddleware(req);
  if (authResponse) return authResponse;

  return res.next();
}

export const config = {
  matcher: ["/", "/:path", "/auth/:path", "/dm/:path"],
};
