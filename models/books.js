const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    year: {
        type:Number,
        required: true,
        max: [2023, 'Year must less than or equal to 2023']
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'ISBN must be unique']
    },
    price: {
        type: Number,
        required: true,
        min: [1000, 'Price must be greater than 1000']
    },
    creatAt: {
        type: Date,
        default: Date.now

    },
    lastUpdateAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('BookStore', BookSchema);
