import db from "@/server/database/db";

export async function getUser(emailOrUsername: string) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id,username,email,created_at FROM users WHERE ${
        emailOrUsername.includes("@") ? "email" : "username"
      } = ?`,
      emailOrUsername,
      (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
}
