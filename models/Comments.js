import mongoose from "mongoose"

export const CommentsSchema = new mongoose.Schema({
  text: { type: String, required: true },

  user: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  postId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Comments", CommentsSchema)
