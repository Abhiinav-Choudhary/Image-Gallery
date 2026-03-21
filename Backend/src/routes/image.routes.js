import express from "express"
import { uploadImage,editImage,deleteImage,getImages,likeImage , unlikeImage } from "../controllers/image.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { adminOnly } from "../middleware/admin.middleware.js"
import upload from "../middleware/upload.middleware.js"

const router = express.Router()

router.post(
  "/",
  verifyJWT,
  adminOnly,
  upload.single("image"),
  uploadImage
)

router.get("/", getImages)

router.put("/:imageId", verifyJWT, adminOnly, editImage)
router.delete("/:imageId", verifyJWT, adminOnly, deleteImage)
router.post("/:imageId/like", verifyJWT, likeImage)
router.post("/:imageId/unlike", verifyJWT, unlikeImage)

export default router
