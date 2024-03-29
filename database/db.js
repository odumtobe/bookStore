//Import mongoose and the dotenv module
const mongoose = require('mongoose');
require('dotenv').config();

//Load the MongoDB URI from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

//Function to connect to MongoDB
// function connectToMONGODB() {
//     //connect to MONGODD using the URI
//     mongoose.connect('MONGODB_URI');

//     //log a message if the connection is successful
//     mongoose.connection.on('connect', () => {
//         console.log('connected to MONGODB successful');
//     });

//     //Log an error message if the connection is not successful
//     mongoose.connection.on('error',(err) => {
//         console.log('Error connection to MONGODB', err);

//     });
// };

function connectToMongoDB() {
    mongoose.connect( MONGODB_URI);

    mongoose.connection.on("connected", () => {
        console.log("Connected to mongoDB successfully")
    })

    mongoose.connection.on("error", () => {
        console.log("Error connecting to MongoDb")
    })
}

//Export the 'connectToMONGODB' function
module.exports = {connectToMongoDB};