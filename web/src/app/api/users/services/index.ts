import db from "@/server/database/db";

export function getUsers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, username, email, created_at FROM users`, (err, rows) => {
      if (err) {
        console.error(err);
        reject("There was an error getting users");
      }
      if (!rows) reject("There are no users");
      resolve(rows);
    });
  });
}
