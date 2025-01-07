import db from "@/server/database/db";

export function getMessages() {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM messages`, (err, rows) => {
      if (err) {
        console.error(err);
        reject("There was an error getting messages");
      }
      if (!rows) reject("There are no messages");
      resolve(rows);
    });
  });
}

export function addMessage(message: string) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO messages (message) VALUES (?)`, [message], (err) => {
      if (err) {
        console.error(err);
        reject("There was an error adding the message");
      }
      resolve("Message added successfully");
    });
  });
}
