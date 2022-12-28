const mongoose = require('mongoose')
const express = require('express')
const app = require('./routes/app')

const PORT = process.env.PORT || 8000

mongoose.connect('mongodb://localhost/NEWUSERDB', () => {
    console.log('connected to DB')
})


app.listen(PORT, () => { console.log(`server up at ${PORT}`) })