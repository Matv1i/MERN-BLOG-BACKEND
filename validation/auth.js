import { body } from "express-validator"

export const registerValidation = [
  body("email", "Wrong format of email").isEmail(),
  body("password", "Wrong format of password").isLength({ min: 5 }),
  body("fullName", "Need A First name ").isLength({ min: 3 }),
  body("avatarUrl", "Wrong link").optional().isURL(),
]

export const loginValidation = [
  body("email", "Wrong format of email").isEmail(),
  body("password", "Wrong format of password").isLength({ min: 5 }),
]

export const postCreateValidation = [
  body("title", "Need a title ").isLength({ min: 3 }).isString(),
  body("text", "Need a text").isLength({ min: 10 }).isString(),
  body("tags", "Wrong format of tags ").optional().isArray(),
  body("imageUrl", "Wrong link").optional().isString(),
]
