import { NextResponse as res } from "next/server";
import { addUser, getUsers } from "./services";
import { createToken } from "@/server/jwt/tokens";

export async function GET() {
  try {
    const users = await getUsers();
    return res.json({ users }, { status: 200 });
  } catch (error) {
    return res.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { fullname, email, password } = await req.json();
  try {
    const result = await addUser(fullname, email, password);
    const token = createToken(result as string, fullname, email);
    const response = { message: "User added successfully", token };
    return res.json(response, { status: 201 });
  } catch (error) {
    console.log(error);
    return res.json({ error }, { status: 500 });
  }
}
