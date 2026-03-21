import Like from "../models/Like.js"

export const getMyLikedImages = async (req, res) => {
  try {
    const userId = req.user.id

    const likedImages = await Like.find({ userId })
      .populate({
        path: "imageId",
        populate: {
          path: "uploadedBy",
          select: "email"
        }
      })

    const images = likedImages.map(like => like.imageId)

    res.status(200).json(images)

  } catch (error) {
    console.error("GET LIKED IMAGES ERROR:", error)
    res.status(500).json({
      message: "Failed to fetch liked images",
      error: error.message
    })
  }
}
