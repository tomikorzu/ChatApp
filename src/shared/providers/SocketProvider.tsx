"use client";

import { createContext, useContext, useMemo } from "react";
import { getSocket } from "../lib/socket";

const SocketContext = createContext<SocketIOClient.Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useMemo(() => getSocket(), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
