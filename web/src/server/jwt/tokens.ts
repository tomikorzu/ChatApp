import jwt, { JwtPayload } from "jsonwebtoken";

export function createToken(payload: object) {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT secret found");
  }
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}

export function verifyToken(token: string): JwtPayload & { email: string } {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT secret found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  if (typeof decoded === "string" || !decoded.email) {
    throw new Error("Invalid token structure");
  }

  return decoded as JwtPayload & { email: string };
}
