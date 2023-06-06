const express = require('express')
const institutemodel = require('../models/institutemodel')
const route = express.Router();
const sendResponse = require('../helpers/helper')

route.get("/", async (req, res) => {
    try {
        const result = await institutemodel.find()
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
        const result = await institutemodel.find({ [field]: val })

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
    }
})
route.post("/", async (req, res) => {
    let { name, adress, shortName,tel } = req.body;
    let errArr = []
    try {
        if (!name) {
            errArr.push('Required: Name')
        }
        if (!adress) {
            errArr.push('Required: Adress')
        }
        if (!tel) {
            errArr.push('Required: Telephone')
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required All Fields"))
        }
        else {
            let obj = { name, adress, shortName,tel}
            let institute = new institutemodel(obj);
            await institute.save();
            if (!institute) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(404)
            }
            else {
                res.send(sendResponse(true, institute, "Saved Succesfully")).status(200)
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
        let result = await institutemodel.findById(id);
        if (!result) {
          res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
          let updateResult = await institutemodel.findByIdAndUpdate(id, req.body, {
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
        const result = await institutemodel.findByIdAndDelete(id)
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