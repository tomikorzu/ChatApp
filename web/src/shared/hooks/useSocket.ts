import io from "socket.io-client";

export function useSocket() {
  const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000";
  return io(SOCKET_URL);
}
