const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
})

const teachermodel = mongoose.model('teacher',teacherSchema)

module.exports = teachermodel;