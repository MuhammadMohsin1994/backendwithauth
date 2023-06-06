const express = require('express');
const sendResponse = require('../helpers/helper');
const usermodel = require('../models/usermodel');
const route = express.Router();
const bcrypt = require('bcryptjs');
const Authcontroller = require('../Controllers/auth');



route.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    console.log(req.body)
    const obj = { firstName, lastName, email, password }
    let requiredArr = ["firstName", "email", "password"]
    let errArr = []
    requiredArr.forEach((x) => {
        if (!obj[x]) {
            errArr.push(x)
        }
    })
    if (errArr.length > 0) {
        res.send(sendResponse(false, null, "Some Field are Missing")).status(400)
        return

    }
    else {
        const hashpassword = await bcrypt.hash(obj.password, 10);
        obj.password = hashpassword;
        const existingUser = await usermodel.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            res.send(sendResponse(false, null, "User Already Found")).status(403)
        }
        else {
            usermodel.create(obj)
                .then((user) => {
                    res.send(sendResponse(true, user, "User Create Successfully"))
                        .status(400);
                })
                .catch((err) => {
                    res.send(sendResponse(false, err, "Internal Server Error"))
                        .status(400);
                })
        }
    }
})
route.post('/login', Authcontroller.login)
route.post('/isauth', Authcontroller.isauth)
module.exports = route;
