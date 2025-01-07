import db from "@/server/database/db";
import bcrypt from "bcrypt";

export function getUsers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, fullname, email, created_at FROM users`, (err, rows) => {
      if (err) {
        console.error(err);
        reject("There was an error getting users");
      }
      if (!rows) reject("There are no users");
      resolve(rows);
    });
  });
}

export async function addUser(
  fullname: string,
  email: string,
  password: string
) {
  const passwordHashed = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)`,
      [fullname, email, passwordHashed],
      function (err) {
        if (err) {
          console.error(err);
          return reject("There was an error adding the user");
        }
        return resolve(this.lastID);
      }
    );
  });
}
