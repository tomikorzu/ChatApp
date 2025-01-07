import jwt from "jsonwebtoken";

export function createToken(id: string, fullname: string, email: string) {
  return jwt.sign({ id, fullname, email }, process.env.JWT_SECRET as string);
}
