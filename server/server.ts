import express, { Express } from "express"
import path from "path"
import router from "./routes/index"
//import morgan from "morgan"
import mongoose, { Connection } from "mongoose"
import cors, { CorsOptions } from "cors"
import { Request, Response } from "express"

const app: Express = express()
const port: number = 1234

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)

if (process.env.NODE_ENV === "development") {
  const corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
} else if (process.env.NODE_ENV === "produnction") {
  app.use(express.static(path.resolve("../..", "client", "build")))
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve("../..", "client", "build", "index.html"))
  })
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
