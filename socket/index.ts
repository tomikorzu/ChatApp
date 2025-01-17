import express from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
const app = express();

const httpServer = createServer(app);

const io = new SocketServer(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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

httpServer.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
