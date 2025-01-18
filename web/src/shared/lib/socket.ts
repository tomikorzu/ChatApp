import io from "socket.io-client";

let socket: SocketIOClient.Socket;

export const getSocket = () => {
  if (!socket) {
    const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:4000";
    socket = io(SOCKET_URL);
  }
  return socket;
};
