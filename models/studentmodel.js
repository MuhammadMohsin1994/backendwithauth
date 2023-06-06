const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
})

const studentmodel = mongoose.model('student',studentSchema)

module.exports = studentmodel;