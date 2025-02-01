import bcrypt from "bcrypt";
import db from "@/server/database/db";

export async function addUser(
  username: string,
  email: string,
  password: string,
  randomCode: string
) {
  const passwordHashed = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, email, password, code) VALUES (?, ?, ?, ?)`,
      [username, email, passwordHashed, randomCode],
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
