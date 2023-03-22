const bookModel = require('../models/books');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');


//Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

//Unix timestamp in seconds
const timestamp = Math.floor(Date.now() / 1000);

//Configure multer to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'books'
    }
});

const upload = multer({storage: storage});

const getBooks = (req, res) => {
    bookModel.find()

    .then(books => {
        // res.render("books", {books});
        res.render("books", {books});
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

const postBooks = async(req,res) => {
    try {
        //Upload img to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            timestamp: timestamp,
        })
        //Save room MongoDB with Cloudinary URL
        const book = await bookModel.create({
            ...req.body,
            imgUrl: result.secure_url
        });
    
        res.status(201).json(book);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};
    // const book = req.body 

    // book.lastUpdateAt = new Date()

    // bookModel.create(book)
    // .then(book => {
    //     res.status(201).json(book)
    // })
    // .catch(err => {
    //     console.log(err)
    //     res.status(500).send(err)
    // })

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
    upload
}