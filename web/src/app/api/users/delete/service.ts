import db from "@/server/database/db";

export async function deleteUser(email: string) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM users WHERE email = ?`, [email], (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
