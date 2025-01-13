import db from "@/server/database/db";

export async function verifyEmail(email: string): Promise<string | false> {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT username FROM users WHERE email = ?`,
      [email],
      (err, row: { username: string }) => {
        if (err) {
          reject(err);
        } else {
          if (!row) resolve(false);
          else resolve(row.username);
        }
      }
    );
  });
}
