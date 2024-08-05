import PostModel from "../models/Post.js"

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec()

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5)

    res.json(tags)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Can't find it" })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate({
      path: "user",
      select: ["name", "avatarUrl", "fullName"],
    })

    res.json(posts)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Cant find it" })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewscount: 1 } },
      { returnDocument: "after" }
    ).populate({
      path: "user",
      select: "fullName avatarUrl",
    })

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json(post)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Can't find it" })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id

    const doc = await PostModel.findByIdAndDelete(postId)

    if (!doc) {
      return res.status(404).json({ message: "Post not found" })
    }

    await CommentsModel.deleteMany({ postId: postId })

    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Can't remove it" })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    const post = await doc.save()
    res.json(post)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Post can't be created" })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    )

    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Can't update it" })
  }
}
