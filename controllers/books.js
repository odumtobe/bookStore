const bookModel = require('../models/books')

const getBooks = (req, res) => {
    bookModel.find()

    .then(books => {
        res.json(books)
    })

    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

const getBookById = (req,res) => {
    const id = req.params.id

bookModel.findById(id)

.then(book => {
    res.status(200).json(book)
}).catch(err => {
    console.log(err)
    res.status(404).send(err)
})

}

const postBooks = (req,res) => {
    const book = req.body 

    book.lastUpdateAt = new Date()

    bookModel.create(book)
    .then(book => {
        res.status(201).json(book)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

const updateBookById = (req, res) => {

    const id = req.params.id

    const book = req.body

    book.lastUpdateAt = new Date()

    bookModel.findByIdAndUpdate(id, book, {new: true})

    .then (newBook => {
        res.status(200).send(newBook)
    })
    .catch (err => {
        console.log(err)
        res.status(500).send(err)
    })
}

const deleteBookById = (req, res) => {

    const id = req.params.id
    bookModel.findByIdAndRemove(id)
    .then(book => {
        res.status(200).send("book deleted successfully")
    })
    .catch(err => {

        console.log(err)
        res.status(500).send(err)
    })
}

module.exports = {
    getBooks, 
    getBookById,
    updateBookById ,
    deleteBookById,
    postBooks,
}