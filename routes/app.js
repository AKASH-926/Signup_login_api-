const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')
const router = require('./User')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const secret = "MYSECRETKEY"
app.use(bodyparser.json())
app.use(cors())
app.use('/api/', router)


app.use('/api/blog', (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.status(400).send(err)
                }
                req.user = decoded.data
                next()

            });


        } else {
            res.send('not authenticated user')
        }


    } catch (e) {
        res.status(400).send(e.message)
    }
})


app.use('/api/blog/', router)
module.exports = app
