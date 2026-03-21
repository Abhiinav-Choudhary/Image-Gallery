import express from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { getMyLikedImages } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/me/liked-images", verifyJWT, getMyLikedImages)

export default router
