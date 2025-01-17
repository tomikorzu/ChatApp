"use client";

import io from "socket.io-client";

export function welcome() {
  const socket = io();
  socket.on("welcome", (data: string) => {
    return data;
  });
}
