import bcrypt from "bcrypt"
import Admin from "../models/Admin.js"
import { generateToken } from "../utils/jwt.js"

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = generateToken({
      id: admin._id,
      role: "admin"
    })

   res
  .cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
  .status(200)
  .json({ message: "Login successful" })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}
