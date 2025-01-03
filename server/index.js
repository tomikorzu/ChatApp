import express from "express"
import morgan from "morgan"
import "dotenv/config"
import { Server as SocketServer } from "socket.io"
import { createServer } from "http"

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()
const server = createServer(app)
const io = new SocketServer(server)

app.use(morgan("dev"))

app.get("/", (_req, res) => {
    res.json({ message: "Hello World" })
})

io.on("connection", socket => {
    console.log("New connection", socket.id)
    socket.on("message", data => {
        console.log("Message", data)
        io.emit("message", data)
    })
})

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})