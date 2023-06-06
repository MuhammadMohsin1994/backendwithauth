const express = require('express')
const Coursemodel = require('../models/coursemodel')
const route = express.Router();
const sendResponse = require('../helpers/helper')

route.get("/", async (req, res) => {
    try {
        const result = await Coursemodel.find()
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
        const result = await Coursemodel.find({ [field]: val })

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
route.post("/", async (req, res) => {
    let { name, duration, fees, shortName} = req.body;
    let errArr = []
    try {
        if (!name) {
            errArr.push('Required: First Name')
        }
        if (!duration) {
            errArr.push('Required: email')
        }
        if (!fees) {
            errArr.push('Required: password')
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required All Fields"))
        }
        else {
            let obj = { name, duration, fees, shortName}
            let Course = new Coursemodel(obj);
            await Course.save();
            if (!Course) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(404)
            }
            else {
                res.send(sendResponse(true, Course, "Saved Succesfully")).status(200)
            }
        }
    }
    catch (err) {
        res.send(sendResponse(false, null, "Internal Server Error"))
        console.log(err)
    }
})
route.put("/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let result = await Coursemodel.findById(id);
        if (!result) {
          res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
          let updateResult = await Coursemodel.findByIdAndUpdate(id, req.body, {
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
        const result = await Coursemodel.findByIdAndDelete(id)
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