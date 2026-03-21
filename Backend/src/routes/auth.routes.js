import express from "express"
import { adminLogin } from "../controllers/adminAuth.controller.js"
import User from "../models/User.js"
import { generateToken } from "../utils/jwt.js"


const router = express.Router()

router.post("/admin/login", adminLogin)
router.post("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({ message: "Logged out successfully" })
})

router.post("/dev-user-login", async (req, res) => {
  try {
    const user = await User.create({
      firebaseUid: "dev-" + Date.now(),
      name: "Dev User",
      email: "dev@example.com"
    })

    const token = generateToken({
      id: user._id,
      role: "user"
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    })

    res.status(200).json({
      message: "Dev user logged in",
      user
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


export default router
