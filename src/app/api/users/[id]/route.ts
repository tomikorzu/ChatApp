import { NextResponse as res } from "next/server";
import { getUserById } from "@/server/services/users/get";
import { deleteUserById } from "@/server/services/users/delete";
import { updateUser } from "@/server/services/users/patch";
import { verifyToken } from "@/server/jwt/tokens";
import { User } from "@/server/types/user";
import { validateAllFields } from "@/server/services/users/validations";

function url(req: Request) {
  return req.url.split(
    `${process.env.URL || "http://localhost:3000"}/api/users/`
  )[1];
}

export async function GET(req: Request) {
  const id = url(req);
  if (!id) return res.json({ error: "User ID is required" }, { status: 400 });
  try {
    const user = await getUserById(id as string);
    if (user === 404)
      return res.json({ error: "User not found" }, { status: 404 });
    return res.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error getting user", error);
    return res.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const id = url(req);

  const authToken = req.headers.get("Authorization");
  if (!authToken)
    return res.json(
      { error: "Authorization token is required" },
      { status: 400 }
    );

  try {
    const token = authToken.split("Bearer ")[1];
    const userPayload = verifyToken(token);
    if (userPayload.id !== parseInt(id))
      return res.json(
        { error: "You are not authorized to update this user" },
        { status: 401 }
      );

    if (!id) return res.json({ error: "User ID is required" }, { status: 400 });
    const { data, type } = await req.json();

    const types = ["email", "username", "bio", "profile_picture"];
    if (!types.includes(type))
      return res.json({ error: "Invalid type" }, { status: 400 });

    if (!data)
      return res.json({ error: `${type} is required` }, { status: 400 });

    const user = await getUserById(id as string);
    if (user === 404 || !user)
      return res.json({ error: "User not found" }, { status: 404 });

    const errors = await validateAllFields(data, type);
    if (errors !== false) return res.json({ error: errors }, { status: 400 });

    const userUpdated = await updateUser(data, type, user as User);
    if (userUpdated === 400)
      return res.json(
        { error: `${type} cannot be the same than the last one` },
        { status: 400 }
      );
    return res.json(
      { message: "User updated successfully!", userUpdated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user", error);
    return res.json({ error }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const id = url(req);
  if (!id) return res.json({ error: "User ID is required" }, { status: 400 });
  try {
    const isDeleted = await deleteUserById(id as string);
    if (isDeleted === 404)
      return res.json({ error: "User not found" }, { status: 404 });
    return res.json({ message: "User deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error getting user", error);
    return res.json({ error }, { status: 500 });
  }
}
