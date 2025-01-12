import jwt from "jsonwebtoken";

export function createToken(payload: object) {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT secret found");
  }
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}
