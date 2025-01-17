import { createServer } from "http";
import next from "next";
import { Server as socketServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const httpServer = createServer(handler);

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

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
