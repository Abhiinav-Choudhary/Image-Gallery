import cloudinary from "../config/cloudinary.js"
import Image from "../models/Image.js"
import Like from "../models/Like.js"

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" })
    }

    const { title } = req.body
    if (!title) {
      return res.status(400).json({ message: "Title required" })
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64")
    const dataURI = `data:${req.file.mimetype};base64,${b64}`

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "image-gallery"
    })

    const newImage = await Image.create({
      imageUrl: uploadResult.secure_url,
      title,
      uploadedBy: req.user.id
    })

    res.status(201).json({
      message: "Upload successful",
      image: newImage
    })

  } catch (error) {
    console.error("UPLOAD ERROR:", error)
    res.status(500).json({
      message: "Upload failed",
      error: error.message
    })
  }
}

export const editImage = async (req, res) => {
  try {
    const { imageId } = req.params
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title required" })
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageId,
      { title },
      { new: true }
    )

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" })
    }

    res.status(200).json({
      message: "Image updated",
      image: updatedImage
    })

  } catch (error) {
    console.error("EDIT IMAGE ERROR:", error)
    res.status(500).json({
      message: "Failed to update image",
      error: error.message
    })
  }
}


export const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params

    const image = await Image.findById(imageId)
    if (!image) {
      return res.status(404).json({ message: "Image not found" })
    }

    // Extract public ID from Cloudinary URL
    const urlParts = image.imageUrl.split("/")
    const fileName = urlParts[urlParts.length - 1]
    const publicId = "image-gallery/" + fileName.split(".")[0]

    await cloudinary.uploader.destroy(publicId)

    await Like.deleteMany({ imageId })

    await Image.findByIdAndDelete(imageId)

    res.status(200).json({ message: "Image deleted successfully" })

  } catch (error) {
    console.error("DELETE IMAGE ERROR:", error)
    res.status(500).json({
      message: "Failed to delete image",
      error: error.message
    })
  }
}

export const getImages = async (req, res) => {
  try {
    const { sort } = req.query

    let sortOption = {}

    if (sort === "oldest") {
      sortOption = { createdAt: 1 }
    } else if (sort === "popular") {
      sortOption = { likeCount: -1 }
    } else {
      // default = newest
      sortOption = { createdAt: -1 }
    }

    const images = await Image.find()
      .sort(sortOption)
      .populate("uploadedBy", "email")

    res.status(200).json(images)

  } catch (error) {
    console.error("GET IMAGES ERROR:", error)
    res.status(500).json({
      message: "Failed to fetch images",
      error: error.message
    })
  }
}



export const likeImage = async (req, res) => {
  try {
    const userId = req.user.id
    const { imageId } = req.params

    // Check if already liked
    const existingLike = await Like.findOne({ userId, imageId })

    if (existingLike) {
      return res.status(400).json({ message: "Image already liked" })
    }

    await Like.create({ userId, imageId })

    await Image.findByIdAndUpdate(imageId, {
      $inc: { likeCount: 1 }
    })

    res.status(200).json({ message: "Image liked" })

  } catch (error) {
    console.error("LIKE ERROR:", error)
    res.status(500).json({
      message: "Failed to like image",
      error: error.message
    })
  }
}

export const unlikeImage = async (req, res) => {
  try {
    const userId = req.user.id
    const { imageId } = req.params

    const existingLike = await Like.findOneAndDelete({ userId, imageId })

    if (!existingLike) {
      return res.status(400).json({ message: "Image not liked yet" })
    }

    await Image.findByIdAndUpdate(imageId, {
      $inc: { likeCount: -1 }
    })

    res.status(200).json({ message: "Image unliked" })

  } catch (error) {
    console.error("UNLIKE ERROR:", error)
    res.status(500).json({
      message: "Failed to unlike image",
      error: error.message
    })
  }
}


