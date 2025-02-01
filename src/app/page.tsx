"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { deleteCookie } from "@/shared/lib/cookies";
import { useRouter } from "next/navigation";
import { useSession } from "@/shared/providers/SessionProvider";

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
      <div className="flex">
      <header className="relative flex flex-col lg:w-[320px] sm:w-1/3 w-full h-screen bg-[#2f2f2f]">
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
        <button
        onClick={handleLogout}
        className="py-2 left-4 right-4 rounded-md bg-[#e21f1f] transition duration-[.4s] hover:brightness-110 absolute bottom-4"
      >
        Log Out
      </button>
      </header>
      <main className="hidden md:flex">
        <h2>Choose one room to chat!</h2>
      </main>
      </div>
    </>
  );
}
