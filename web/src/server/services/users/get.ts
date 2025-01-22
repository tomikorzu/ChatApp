import { allAsync, getAsync, Params } from "@/server/database/helpers";
import { User } from "@/server/types/user";

const getUserQuery = `SELECT id, username, email, bio, profile_picture, created_at FROM users`;

export async function getUsers() {
  return await allAsync(
    `${getUserQuery} WHERE verified = 1 ORDER BY created_at DESC`
  );
}

export async function getUserById(id: string): Promise<User | null | 404 | Params> {
  return await getAsync(`${getUserQuery} WHERE id = ?`, [id]);
}

export async function getUserByEmail(email: string) {
  return await getAsync(`${getUserQuery} WHERE email = ?`, [email]);
}

export async function getUserByUsername(username: string) {
  return await getAsync(`${getUserQuery} WHERE username = ?`, [username]);
}
