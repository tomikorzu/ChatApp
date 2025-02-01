"use client";

import { deleteCookie } from "@/shared/lib/cookies";
import { useSession } from "@/shared/providers/SessionProvider";
import Link from "next/link";
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
    Promise.all([getFriends(session?.user.id)]);
  }, [session?.user.id]);

  const router = useRouter();
  function handleLogout() {
    deleteCookie("auth-token");
    router.push("/auth/login");
  }
  return (
    <>
      <button
        onClick={handleLogout}
        className="p-2 rounded-md bg-[#e21f1f] transition duration-[.4s] hover:brightness-110 fixed top-2 right-2"
      >
        Log Out
      </button>
      <section className="flex flex-col max-w-xs min-h-screen bg-[#2f2f2f]">
        <h1 className="font-bold text-xl sm:text-2xl mt-5 mb-3 ml-3">
          Dashboard
        </h1>
        {friends.length > 0 ? (
          <ul className="flex flex-col w-full">
            {friends.map((friend: Friends) => {
              return (
                <li key={friend.id}>
                  <Link
                    href={`${friend.id}`}
                    className="w-full bg-[#2f2f2f] flex items-center py-2 pl-3 gap-2 cursor-pointer hover:brightness-[115%] transition duration-[.4s]"
                  >
                    <img
                      src={friend.profile_picture || "/images/me.jpeg"}
                      alt={friend.username}
                      className="size-12 object-cover rounded-full"
                    />
                    <h2>{friend.username}</h2>
                    <p>{friend.bio}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No friends found</p>
        )}
      </section>
    </>
  );
}
