const mongoose = require('mongoose')


const Schema = mongoose.Schema

const signup_Schema = new Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const SignupDB = mongoose.model('SignupDB', signup_Schema)

module.exports = SignupDB;