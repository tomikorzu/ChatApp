"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import SearchBar from "@/shared/ui/MenuBar/components/SearchBar";
import Title from "../components/Title";
import { usePathname } from "next/navigation";
import { useSession } from "@/shared/providers/SessionProvider";

interface Friends {
  id: number;
  username: string;
  profile_picture: string;
  bio: string;
  email: string;
  created_at: string;
}

export default function Dm() {
  const [friends, setFriends] = useState<Friends[] | []>([]);
  const session = useSession();
  const pathname = usePathname();

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
  return (
    <>
      <Title>Direct Messages</Title>
      <SearchBar />
      {friends.length > 0 ? (
        <ul className="flex flex-col w-full">
          {friends.map((friend: Friends) => {
            return (
              <li key={friend.id}>
                <Link
                  href={`/dm/${friend.id}`}
                  className={`w-full z-10 ${
                    pathname === `/dm/${friend.id}`
                      ? "bg-[#4a4a4a]"
                      : "bg-[#2f2f2f] lg:hover:bg-[#3b3b3b]"
                  } flex items-center py-2 pl-2 rounded-md gap-2 cursor-pointer transition duration-[.4s]`}
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
    </>
  );
}
