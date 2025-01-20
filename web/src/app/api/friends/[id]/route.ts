import { NextResponse as res } from "next/server";
import { getFriends } from "./service";
import { getUserById } from "../../users/[id]/service";

export async function GET(req: Request) {
  const id = req.url.split("http://localhost:3000/api/friends/")[1];
  try {
    const usersId = await getFriends(id);

    const friendsArray: string[] = [];

    usersId.map((friend) => {
      if (friend.user1_id == id) return friendsArray.push(friend.user2_id);
      else return friendsArray.push(friend.user1_id);
    });

    const friends = await Promise.all(
      friendsArray.map((friendId) => getUserById(parseInt(friendId)))
    );

    return res.json({ friends }, { status: 200 });
  } catch (error) {
    console.error("Error getting friends", error);
    return res.json({ error }, { status: 500 });
  }
}
