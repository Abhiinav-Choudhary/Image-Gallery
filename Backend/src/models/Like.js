import mongoose from "mongoose"

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      required: true
    }
  },
  { timestamps: true }
)

// Prevent duplicate likes
likeSchema.index({ userId: 1, imageId: 1 }, { unique: true })

export default mongoose.model("Like", likeSchema)
