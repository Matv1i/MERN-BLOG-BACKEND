import CommentsModel from "../models/Comments.js"

// Comments
export const createComment = async (req, res) => {
  try {
    const { text, fullName, avatarUrl, postId } = req.body

    const newComment = new CommentsModel({
      text,
      user: fullName,
      avatarUrl,
      postId,
    })

    const savedComment = await newComment.save()
    res.json(savedComment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create comment" })
  }
}

export const getComments = async (req, res) => {
  try {
    const comments = await CommentsModel.find()
    res.json(comments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to get comments" })
  }
}
