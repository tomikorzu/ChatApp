import jwt from "jsonwebtoken";

export function createToken(id: string, fullname: string, email: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT secret found");
  }
  return jwt.sign({ id, fullname, email }, process.env.JWT_SECRET as string);
}
