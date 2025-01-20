"use client";

import { deleteCookie } from "@/shared/lib/cookies";
import { useSession } from "@/shared/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Friends {
  id: number;
  username: string;
  profile_picture: string;
  bio: string;
  email: string;
  created_at: string;
}

export default function DashboardPage() {
  const [friends, setFriends] = useState<Friends[] | []>([]);
  const session = useSession();

  async function getFriends(id: number | undefined) {
    const res = await fetch(`/api/friends/${id}`);
    if (res.status === 200) {
      const { friends } = await res.json();
      setFriends(friends);
    } else setFriends([]);
  }
  useEffect(() => {
    getFriends(session?.user.id);
  }, [session?.user.id]);

  const router = useRouter();
  function handleLogout() {
    deleteCookie("auth-token");
    router.push("/auth/login");
  }
  return (
    <>
      <h1>Dashbiard</h1>
      <button
        onClick={handleLogout}
        className="p-2 rounded-md bg-[#e21f1f] transition duration-[.4s] hover:brightness-110"
      >
        Log Out
      </button>
      <ul>
        {friends ? (
          friends.map((friend: Friends) => {
            return (
              <li key={friend.id}>
                {friend.profile_picture && (
                  <img src={friend.profile_picture} alt={friend.username} />
                )}
                <h2>{friend.username}</h2>
                <p>{friend.bio}</p>
              </li>
            );
          })
        ) : (
          <p>No friends found</p>
        )}
      </ul>
    </>
  );
}
