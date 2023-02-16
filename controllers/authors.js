const authorModel = require('../models/authors')

const getAuthors = (req, res) => {
    authorModel.find()

    .then(authors => {
        res.json(authors)
    })

    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

const getAuthorById = (req,res) => {
    const id = req.params.id

authorModel.findById(id)

.then(author => {
    res.status(200).json(author)
}).catch(err => {
    console.log(err)
    res.status(404).send(err)
})

}

const postAuthors = (req,res) => {
    const author = req.body 

    author.createAt = new Date()

    authorModel.create(author)
    .then(author => {
        res.status(201).json(author)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}

const updateAuthorById = (req, res) => {

    const id = req.params.id

    const author = req.body

    author.lastUpdateAt = new Date()

    authorModel.findByIdAndUpdate(id, author, {new: true})

    .then (newAuthor => {
        res.status(200).send(newAuthor)
    })
    .catch (eer => {
        console.log(err)
        res.status(500).send(err)
    })
}

const deleteAuthorById = (req, res) => {

    const id = req.params.id
    authorModel.findByIdAndRemove(id)
    .then(author => {
        res.status(200).send("deleted successfully")
    })
    .catch(err => {

        console.log(err)
        res.status(500).send(err)
    })
}

module.exports = {
    getAuthors, 
    getAuthorById,
    updateAuthorById ,
    deleteAuthorById,
    postAuthors,
}