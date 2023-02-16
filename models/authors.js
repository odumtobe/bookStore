const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
        max: [2020, 'year must be less than 2020' ]
    },
    nationality: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true, 

    },
    state: {
        type: String,
        required: true,

    },
    living: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('authors', AuthorSchema);
