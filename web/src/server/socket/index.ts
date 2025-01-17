import { Server as socketServer } from "socket.io";
import { Server as httpServer } from "http";

export async function setupSocket(httpServer: httpServer) {
  const io = new socketServer(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    socket.data = { username: "amor" };

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });

    socket.on("message", (data) => {
      console.log(data);
      socket.broadcast.emit("message", data);
    });
  });
}
