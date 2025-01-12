import { NextRequest, NextResponse as res } from "next/server";
import { deleteUser } from "./service";

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();

  try {
    const isDeleted = await deleteUser(email);
    return res.json(
      { message: "User deleted successfully", isDeleted },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return res.json({ message: "User not found" }, { status: 404 });
  }
}
