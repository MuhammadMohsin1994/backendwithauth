const express = require('express');
const sendResponse = require('../helpers/helper');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Authcontroller = {
    login: async (req, res) => {
        const { email, password } = req.body
        const obj = { email, password }
        usermodel.findOne({ email })
            .then(async (user) => {
                let isconifrm = await bcrypt.compare(obj.password, user.password);
                if (isconifrm) {
                    let token = jwt.sign({ user }, process.env.SECURE_KEY)
                    res.send(sendResponse(true, { user, token }, "Login Successfully"))
                }
                else {
                    res.send(sendResponse(false, null, "Credential Error"))
                }
            })
            .catch((err) => {
                res.send(sendResponse(false, err, "User Not Exist"))
            })

    },
    protected: async (req, res, next) => {
        let token = req.headers.authorization
        token = token.split(" ")[1];
        jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
            if (err) {
                res.send(sendResponse(false, null, "UnAuthorized User")).status(403)
            }
            else {
                console.log(decoded)
                next();

            }
        })
    },
    isauth:async (req,res)=>{
        let token = req.headers.authorization;
        jwt.verify(token,process.env.SECURE_KEY,(err,decode)=>{
            if(err){
                res.send(sendResponse(false, null, "UnAuthorized User")).status(404)
            }
            else{
                res.send(sendResponse(true, decode._doc, "Authorized User")).status(200)
            }
        })
    }
}
module.exports = Authcontroller;