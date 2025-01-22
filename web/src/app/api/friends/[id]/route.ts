import { NextResponse as res } from "next/server";
import { getFriends } from "./service";
import { getUserById } from "@/server/services/users/get";

const url = `${process.env.URL || "http://localhost:3000"}/api/friends/`;

export async function GET(req: Request) {
  const id = req.url.split(url)[1];
  try {
    const usersId = await getFriends(id);

    const friendsArray: string[] = [];

    usersId.map((friend) => {
      if (friend.user1_id == id) return friendsArray.push(friend.user2_id);
      else return friendsArray.push(friend.user1_id);
    });

    const friends = await Promise.all(
      friendsArray.map((friendId) => getUserById(friendId as string))
    );

    return res.json({ friends }, { status: 200 });
  } catch (error) {
    console.error("Error getting friends", error);
    return res.json({ error }, { status: 500 });
  }
}
