import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
export const app = express()
import authRoute from './routes/auth.routes.js'
import imageRoutes from "./routes/image.routes.js"
import userRoutes from "./routes/user.routes.js"
import { verifyJWT } from "./middleware/auth.middleware.js"
// middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// routes
app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" })
})

app.get("/api/auth/me", verifyJWT, (req, res) => {
  res.json({ user: req.user })
})

app.use("/api/auth" , authRoute)

app.use("/api/images", imageRoutes)


app.use("/api/users", userRoutes)

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err)
  res.status(500).json({
    message: "Something broke",
    error: err.message || err
  })
})



