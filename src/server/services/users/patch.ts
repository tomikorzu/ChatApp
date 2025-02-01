import { getAsync, runAsync } from "@/server/database/helpers";
import { User } from "@/server/types/user";

type Data = {
  email?: string;
  username?: string;
  bio?: string;
  profile_picture?: string;
};

export async function updateUser(
  data: Data,
  col: string,
  user: User
): Promise<User | 400 | 404 | 409 | void> {
  if (!user) return 404;
  if (user[col as keyof User] === data) return 400;

  await runAsync(`UPDATE users SET ${col} = ? WHERE id = ?`, [data, user.id]);
  return (await getAsync(
    `SELECT id, username, email, bio, profile_picture, created_at FROM users WHERE id = ?`,
    [user.id]
  )) as void;
}
