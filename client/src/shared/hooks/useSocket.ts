import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io();
      socketRef.current = newSocket;
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        socketRef.current = null;
      };
    }
  }, []);

  return socket;
}
