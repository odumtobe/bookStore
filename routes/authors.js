const express = require('express');

const {
    getAuthors, 
    getAuthorById,
    postAuthors,
    deleteAuthorById,
    updateAuthorById,
} = require ('../controllers/authors');

const authorRouter = express.Router()

authorRouter.get("/", getAuthors);
authorRouter.get("/:id",getAuthorById)
authorRouter.post("/", postAuthors)
authorRouter.delete("/:id", deleteAuthorById)
authorRouter.patch("/:id", updateAuthorById)

module.exports = authorRouter