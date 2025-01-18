import express from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
const app = express();

const PORT = process.env.PORT || 4000;

const httpServer = createServer(app);

const io = new SocketServer(httpServer, {
  cors: {
    origin: process.env.WEB_URL || "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the chat socket server, the web url is:",
  });
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

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
