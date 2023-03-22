const express = require ("express");
const bodyParser = require("body-parser")
require('dotenv').config();
const booksRoute = require('./routes/books');
const authorsRoute = require('./routes/authors');
const usersRoute = require('./routes/users');
//import books route here
const db = require('./database/db');


const port = 8000
const app = express();
db.connectToMongoDB();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/books', booksRoute);
app.use('/authors', authorsRoute);
app.use('/users', usersRoute);

// /homepage
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/books", (req,res) => {
    res.render("books")
})

app.use((req, res) => {
    res.status(404).json({message:'Page not found'});
});


app.listen(port, () => {
    console.log(`bookStore is running at http://localhost:${port}`);
});



// const books = require("./");

// //use imported books route here
// app.use("/books", )
// const bodyParser = require('body-Parser');





// app.use(bodyParser.json());

