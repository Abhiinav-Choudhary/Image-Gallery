import admin from "../config/firebase.js"
import User from "../models/User.js"
import { generateToken } from "../utils/jwt.js"

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body

    if (!idToken) {
      return res.status(400).json({ message: "ID token required" })
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken)

    const { uid, name, email, picture } = decodedToken

    let user = await User.findOne({ firebaseUid: uid })

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        name,
        email,
        photoURL: picture
      })
    }

    const token = generateToken({
      id: user._id,
      role: "user"
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    })

    res.status(200).json({ message: "User login successful" })

  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error)
    res.status(401).json({
      message: "Invalid Google token",
      error: error.message
    })
  }
}