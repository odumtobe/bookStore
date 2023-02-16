const express = require ("express");
const bcrypt = require("bcrypt")

require('dotenv').config();


const User= require('./models/users');
const booksRoute = require('./routes/books');
const authorsRoute = require('./routes/authors');
const usersRoute = require('./routes/users');
//import books route here
const db = require('./database/db');


const port = 8000
const app = express();
db.connectToMongoDB();



app.use(express.static('public'));
app.use(express.json());

app.use('/homepage',authenticate)
app.use('/books', authenticate, booksRoute);
app.use('/authors', authenticate, authorsRoute);
app.use('/users', authenticate, usersRoute);

app.get("/homepage", (req, res) => {
    res.status(200).json({message:"This is the Homepage"})
})

app.post('/login', async (req,res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username})
        if(!user) {
            return res.status(401).json({ 
                message: "Username or password is incorrect"
            });
        }

        if (password === user.password) {

            const token = Buffer.from(`${username};${password}`).toString("base64");

            return res.status(200).json({
                message: "Auth successful", 
                token:token
            });

        } else {
            return res.status(401).json({
                message: "auth failed"
            })
        }
    })


async function authenticate(req, res, next) {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization.split(' ');
        const authType = authHeader[0];
        const authValue = authHeader[1];
        if (authType === 'Basic') {
            const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');
            const user = await User.findOne({username});
            if (!user) {
                return res.status(401).json({
                    message: 'Authorization failed'
                });
            }

            const isPasswordMatch = await bcrypt.compare(password,user.password);
            if(isPasswordMatch) {
                req.user = user.username;
                next();
            } else {
                return res.status(401).json({
                    message: 'Password or Username incorrect'
                })
            }
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Header not present'
        });
    }
};

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

