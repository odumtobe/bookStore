const express = require('express');


const {
    getBooks, 
    getBookById,
    postBooks,
    deleteBookById,
    updateBookById,
} = require ('../controllers/books');

const bookRouter = express.Router()

bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById)
bookRouter.post("/", postBooks)
bookRouter.delete("/:id", deleteBookById)
bookRouter.patch("/:id", updateBookById)

module.exports = bookRouter