import { createServer as httpServer } from "http";
import { Server as SocketServer } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = httpServer(handler);

  const io = new SocketServer(server);

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    socket.data = { username: "amor" };

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });

    socket.on("message", (content, user) => {
      socket.broadcast.emit("message", content, user.username);
    });

    socket.on("typing", (isTyping, username) => {
      if (isTyping === true)
        socket.broadcast.emit("typing", isTyping, username);
      else socket.broadcast.emit("typing", false, "");
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
