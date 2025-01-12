import db from "@/server/database/db";

export function getUser(id: string) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, username, email, created_at FROM users WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) {
          console.error(err);
          reject("There was an error getting the user");
        }
        if (!row) reject("User not found");
        resolve(row);
      }
    );
  });
}
