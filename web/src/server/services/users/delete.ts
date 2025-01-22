import { runAsync } from "@/server/database/helpers";
import { getUserByEmail, getUserById, getUserByUsername } from "./get";

const deleteUserQuery = `DELETE FROM users WHERE`;
export async function deleteUserById(id: string) {
  const user = await getUserById(id);
  if (user === 404) return 404;
  return await runAsync(`${deleteUserQuery} id = ?`, [id]);
}

export async function deleteUserByEmail(email: string) {
  const user = await getUserByEmail(email);
  if (user === 404) return 404;
  return await runAsync(`${deleteUserQuery} email = ?`, [email]);
}

export async function deleteUserByUsername(username: string) {
  const user = await getUserByUsername(username);
  if (user === 404) return 404;
  return await runAsync(`${deleteUserQuery} username = ?`, [username]);
}
