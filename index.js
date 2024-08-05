import express, { urlencoded } from "express"
import mongoose from "mongoose"
import multer from "multer"
import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validation/auth.js "
import * as PostController from "./Controllers/PostController.js"
import * as UserController from "./Controllers/UserController.js"

import * as CommentsController from "./Controllers/CommentsController.js"
import checkAuth from "./utils/checkAuth.js"
import handleValidationErros from "./utils/handleValidationErros.js"

import cors from "cors"

import dotenv from "dotenv"
dotenv.config()

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

const PORT = 5000

const key = process.env.DATA_BASE_KEY

mongoose
  .connect(key, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB OK")
  })
  .catch((err) => console.log("DB Error", err))

app.use(express.json())

app.use(cors())

app.use("/uploads/", express.static("uploads"))

app.post(
  "/auth/register",

  registerValidation,
  handleValidationErros,
  UserController.register
)

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErros,
  UserController.login
)

app.get("/auth/me", checkAuth, UserController.authMe)

app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

//Posts

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErros,
  PostController.create
) //create

app.get("/posts", PostController.getAll)
//get all of posts
app.get("/tags", PostController.getLastTags)

app.get("/posts/:id", PostController.getOne) // get one certain post

app.delete("/posts/:id", checkAuth, PostController.remove) //remove post

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErros,
  PostController.update
) //update  post

//comments

app.post("/comments", checkAuth, CommentsController.createComment)

app.get("/comments", CommentsController.getComments)
//
app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log("Server Ok")
})
