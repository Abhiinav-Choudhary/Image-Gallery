import mongoose from "mongoose"

const imageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
    likeCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

export default mongoose.model("Image", imageSchema)
