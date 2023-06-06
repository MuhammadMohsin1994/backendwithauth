const express = require('express')
const studentmodel = require('../models/studentmodel')
const route = express.Router();
const sendResponse = require('../helpers/helper');
const Authcontroller = require('../Controllers/auth');
const jwt = require('jsonwebtoken')


route.get("/", Authcontroller.protected,  async (req, res) => {
    try {
        
        

        const result = await studentmodel.find()
        if (!result) {
            res.send(sendResponse(false, null, 'Data Not Found'))
                .status(404)
        }
        else {
            res.send(sendResponse(true, result, 'Success'))
                .status(200)
        }
    } catch (e) {
        res.send({
            staus: false,
            data: null,
            message: 'Internal Server Error'
        })
            .status(404)
    }
})
route.get("/search", async (req, res) => {
    let field = req.query.field;
    let val = req.query.val
    try {
        const result = await studentmodel.find({ [field]: val })

        if (!result) {
            res.send(sendResponse(false, null, 'Data Not Found'))
                .status(404)
        }
        else {
            res.send(sendResponse(true, result, 'Success'))
                .status(200)
        }
    }
    catch (e) {
        res.send({
            staus: false,
            data: null,
            message: 'Internal Server Error'
        })
            .status(404)
        console.log(e)


    }
})
route.post("/searchstd", async(req, res) => {
    let { pageNo, pageSize, searchEntity, searchvVal } = req.body
    try {
        let result = await studentmodel
            .find({ [searchEntity]: searchvVal })
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            if (result){
                res.send(sendResponse(true,result)).status(200)
            }
            else{
                res.send(sendResponse(false,"No Data Found")).status(200)
            }
    }
    catch(e){
        res.send(sendResponse(false,e)).status(200)

    }

})
route.post("/", async (req, res) => {
    let { firstName, lastName, email, password, contact } = req.body;
    let errArr = []
    try {
        if (!firstName) {
            errArr.push('Required: First Name')
        }
        if (!email) {
            errArr.push('Required: email')
        }
        if (!password) {
            errArr.push('Required: password')
        }
        if (!contact) {
            errArr.push('Required: Contact')
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required All Fields"))
        }
        else {
            let obj = { firstName, lastName, email, password, contact }
            let Student = new studentmodel(obj);
            await Student.save();
            if (!Student) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(404)
            }
            else {
                res.send(sendResponse(true, Student, "Saved Succesfully")).status(200)
            }
        }
    }
    catch (err) {
        res.send(sendResponse(false, null, "Internal Server Error"))
        console.log(err)
    }
})
route.put("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await studentmodel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
            let updateResult = await studentmodel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updateResult) {
                res.send(sendResponse(false, null, "Error")).status(404);
            } else {
                res
                    .send(sendResponse(true, updateResult, "Updated Successfully"))
                    .status(200);
            }
        }
    } catch (error) {
        res.send(sendResponse(false, error, "Internal Server Error")).status(500)
    }
})
route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await studentmodel.findByIdAndDelete(id)
        if (!result) {
            res.send(sendResponse(false, null, 'Some thing went wrong')).status(400)
        }
        else {
            res.send(sendResponse(true, result, "Deleted Sucessfully")).status(200)
        }
    } catch (e) {
        res.send(sendResponse(false, null, 'Some thing went wrong')).status(400)
    }
})

module.exports = route