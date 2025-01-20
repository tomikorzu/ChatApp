import db from "@/server/database/db";

export async function getUserById(id: number) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT username, profile_picture, bio, email, created_at FROM users WHERE id = ? AND verified = 1`,
      [id],
      (err, row) => {
        if (err) {
          console.error("Error getting user", err);
          reject(err);
        } else {
          if (!row) reject("No user found");
          resolve(row);
        }
      }
    );
  });
}
