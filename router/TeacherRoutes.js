const express = require('express')
const teachermodel = require('../models/teachermodel')
const route = express.Router();
const sendResponse = require('../helpers/helper')

route.get("/", async (req, res) => {
    try {
        const result = await teachermodel.find()
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
        const result = await teachermodel.find({ [field]: val })

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
    let { name, course, contact } = req.body;
    let errArr = []
    try {
        if (!name) {
            errArr.push('Required: Name')
        }
        if (!course) {
            errArr.push('Required: Course')
        }
        if (!contact) {
            errArr.push('Required: Contact')
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required All Fields"))
        }
        else {
            let obj = { name, course, contact}
            let teacher = new teachermodel(obj);
            await teacher.save();
            if (!teacher) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(404)
            }
            else {
                res.send(sendResponse(true, teacher, "Saved Succesfully")).status(200)
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
        let result = await teachermodel.findById(id);
        if (!result) {
          res.send(sendResponse(false, null, "No Data Found")).status(400);
        } else {
          let updateResult = await teachermodel.findByIdAndUpdate(id, req.body, {
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
        const result = await teachermodel.findByIdAndDelete(id)
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