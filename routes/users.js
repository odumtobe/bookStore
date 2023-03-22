const express = require('express');

const {
    getUsers, 
    getUserById,
    postUsers,
    signup,
    login,
    deleteUserById,
    updateUserById,
} = require ('../../bookStore/controllers/users');

const userRouter = express.Router()

userRouter.get("/", getUsers);
userRouter.get("/:id",getUserById)
userRouter.post("/", postUsers)
userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.delete("/:id", deleteUserById)
userRouter.patch("/:id", updateUserById)

module.exports = userRouter