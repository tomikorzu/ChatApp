import db from "@/server/database/db";

export async function getFriends(
  userId: string
): Promise<{ user1_id: string; user2_id: string }[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT user1_id, user2_id FROM friends WHERE user1_id = ? AND status = 'accepted' UNION SELECT user1_id, user2_id FROM friends WHERE user2_id = ? AND status = 'accepted'`,
      [userId, userId],
      (err, row: { user1_id: string; user2_id: string }[]) => {
        if (err) {
          console.error("Error getting friends", err);
          reject(err);
        } else {
          if (!row || row.length === 0) reject("No friends found");
          resolve(row);
        }
      }
    );
  });
}
