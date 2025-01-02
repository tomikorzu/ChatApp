import express from "express"
import morgan from "morgan"
import "dotenv/config"
import cors from "cors"
import { Server } from "http"
import db from "./src/databases/db.js"

const app = express()
const PORT = process.env.PORT

const corsConfig = {
    origin: `http://localhost:${PORT}`,
    ws: true,
    credentials: true
}

app.use(cors(corsConfig))

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})