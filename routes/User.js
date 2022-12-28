const mongoose = require('mongoose')
const express = require('express')
const SignupDB = require('../models/Schema')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');


const secret = "MYSECRETKEY"

router.post('/signup', body('Name').isAlpha(), body('Email').isEmail(), body('password').isLength({ min: 6 }), (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            try {
                const SingnUpuser = await SignupDB.create({
                    Name: req.body.Name,
                    Email: req.body.Email,
                    password: hash
                })
                res.status(201).json({
                    status: 'User Created',
                    user: SingnUpuser
                })
            } catch (e) {
                res.status(400).send(e.message)

            }


        });

    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await SignupDB.find({ Email: req.body.Email })
        // res.send(user)
        if (user.length > 0) {
            bcrypt.compare(req.body.password, user[0].password, function (err, result) {

                if (result) {

                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user[0]._id
                    }, secret);

                    res.status(200).json({
                        message: 'Succesfully logged in',
                        token: token
                    })
                }
                else {
                    return res.status(400).send('password incorrect')
                }
            });
        } else {
            return res.status(400).send('Email not present')
        }



    } catch (e) {
        return res.status(400).send(e.message)
    }
})



router.get('/newblog', (req, res) => {
    try {
        res.status(200).send('welcome to new blog')
        console.log(req.user)
    } catch (e) {
        res.send(400).send(e.message
        )
    }
})


module.exports = router