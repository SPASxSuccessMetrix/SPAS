import express, {Request, Response} from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth"
import questionRouter from "./routes/questions"
import uploadRouter from "./routes/upload"

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/auth", authRouter)
app.use("/questions", questionRouter)
app.use("/upload", uploadRouter)

const PORT = process.env.PORT
const mongoDBURL = process.env.MONGO_URL


app.get("/", (req:Request, res:Response) => {
    res.send("Backend Connected!")
})

//Connect to MongoDB
    const connectToMongoDb = async () => {
        if(!mongoDBURL){
            throw new Error("No MongoDB URL provided")
        }
        try{
            await mongoose.connect(mongoDBURL, {dbName: "spas"})
            console.log("Database Connection established!")
        }catch(err){
            console.log(err)
        }
    }
    connectToMongoDb()
//

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})