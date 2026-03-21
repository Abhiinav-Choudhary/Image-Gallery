import bcrypt from "bcrypt"
import mongoose from "mongoose"
import Admin from "../models/Admin.js"
import dotenv from "dotenv"

dotenv.config()

await mongoose.connect(process.env.MONGO_URL)

const hashedPassword = await bcrypt.hash("admin123", 10)

await Admin.create({
  email: "admin@example.com",
  password: hashedPassword
})

console.log("Admin created")
process.exit()
