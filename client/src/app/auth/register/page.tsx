"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seePassword, setSeePassword] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ fullname: username, email, password }),
    });

    if (res.status === 201) {
      router.push("/check");
    } else {
    }
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-6 py-4 rounded-lg bg-slate-800 text-center items-center"
      >
        <Image
          src={"/socketio.svg"}
          alt="Socket.io logo"
          width={70}
          height={70}
        />
        <h1 className="text-2xl sm:text-3xl font-bold">Create an account</h1>
        <input
          className="text-slate-100 p-2.5 my-2 rounded-md text-md w-full bg-slate-600 border border-slate-100"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="text-slate-100 p-2.5 my-2 rounded-md text-md w-full bg-slate-600 border border-slate-100"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative flex items-center w-full">
          <input
            className="text-slate-100 p-2.5 my-2 rounded-md text-md w-full bg-slate-600 border border-slate-100 pr-11"
            type={seePassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setSeePassword(!seePassword)}
            type="button"
            className="absolute right-0 text-slate-100 text-sm p-2"
          >
            {!seePassword ? <Eye /> : <EyeOff />}
          </button>
        </div>
        <button
          type="submit"
          className="bg-[#25c2a0] text-[#111] mt-2 font-bold py-2 px-3 rounded-lg transition duration-[.4s] lg:hover:brightness-110"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
