import sqlite from "sqlite3";

const db = new sqlite.Database("./src/server/database/database.db", (err) => {
  if (err) {
    console.error("Error connecting to database");
    return;
  }
  console.log("Connected to database successfully");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    profile_picture TEXT,
    bio TEXT,
    code varchar(6),
    verified BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            sender_id INTEGER NOT NULL,
            receiver_id INTEGER NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
        )`);

db.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL UNIQUE, 
    description TEXT,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);
`);

db.run(`CREATE TABLE IF NOT EXISTS friends (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  user1_id INTEGER NOT NULL,
  user2_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users (id) ON DELETE CASCADE
);`);

db.run(`CREATE TABLE IF NOT EXISTS friend_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            user_id INTEGER NOT NULL,
            friend_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, friend_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE
        )`);

db.run("PRAGMA busy_timeout = 5000;");
db.run("PRAGMA journal_mode=WAL;");

function cleanUpUnverifiedUsers() {
  const query = `
        DELETE FROM users 
        WHERE verified = 0 
          AND created_at <= datetime('now', '-15 minutes');
    `;

  db.run(query, function (err) {
    if (err) {
      console.error("There was an error deleting users:", err.message);
    }
  });
}

setInterval(cleanUpUnverifiedUsers, 900000);

function addFriends() {
  db.run(
    `INSERT INTO friends (user1_id, user2_id, status) VALUES (1, 2, 'accepted'),(1,3,'accepted'),(1,4,'accepted'),(1,5,'accepted')`
  );
}
function addUsers() {
  db.run(
    `INSERT INTO users (username, email, password, code, verified, profile_picture) VALUES ("tomikorzu", "tomykorzu@icloud.com", "$2b$10$dn4vRLWvxsqOc099D24x4OQeRJvAhbucy74QtCnQEPR4RGRlOk2jC", "-", 1, "https://avatars.githubusercontent.com/u/167248198?v=4"),("nicokorzu", "nkorzusehec@fi.uba.ar", "$2b$10$dn4vRLWvxsqOc099D24x4OQeRJvAhbucy74QtCnQEPR4RGRlOk2jC", "-", 1, "https://avatars.githubusercontent.com/u/99510894?v=4"), ("mileDimitroff","miledimitroff1@gmail.com", "$2b$10$dn4vRLWvxsqOc099D24x4OQeRJvAhbucy74QtCnQEPR4RGRlOk2jC", "-", 1, ""), ("silvi", "silvanaredolatti@hotmail.com", "$2b$10$dn4vRLWvxsqOc099D24x4OQeRJvAhbucy74QtCnQEPR4RGRlOk2jC", "-", 1, ""), ("charly", "korzuarq@gmail.com", "$2b$10$dn4vRLWvxsqOc099D24x4OQeRJvAhbucy74QtCnQEPR4RGRlOk2jC", "-", 1, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.instagram.com%2Fcharly_korzu%2F&psig=AOvVaw20GbEn1jABF3NjSSKuaHfz&ust=1737450812850000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCilef6g4sDFQAAAAAdAAAAABAE")`
  );
}

db.serialize(() => {
  db.get(`SELECT COUNT(*) FROM friends`, (err, row: { "COUNT(*)": number }) => {
    if (err) {
      console.error("Error checking for friends", err);
      return;
    }
    if (row["COUNT(*)"] === 0) {
      addFriends();
    }
  });
  db.get(`SELECT COUNT(*) FROM users`, (err, row: { "COUNT(*)": number }) => {
    if (err) {
      console.error("Error checking for users", err);
      return;
    }
    if (row["COUNT(*)"] === 0) {
      addUsers();
    }
  });
});

export default db;
