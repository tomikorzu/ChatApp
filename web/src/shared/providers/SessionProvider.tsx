"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export interface User {
  user: {
    id: number;
    email: string;
    username: string;
    created_at: string;
  };
}

export const SessionContext = createContext<User | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const authToken = getCookie("auth-token");

    if (!authToken) return null;

    const user = await fetch("/api/user", {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!user) return null;

    setUser(await user.json());
  }

  return (
    <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
