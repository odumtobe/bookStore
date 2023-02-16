const mongoose = require('mongoose');

const bcrypt = require ("bcrypt")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    createAt:{
        type: Date,
        default: Date.now,
    },

    lastUpdateAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if(this.password) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

module.exports = mongoose.model('users', UserSchema);