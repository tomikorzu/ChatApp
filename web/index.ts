import { createServer } from "http";
import next from "next";
import { setupSocket } from "./src/server/socket/index.ts";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const httpServer = createServer(handler);

  setupSocket(httpServer);

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
