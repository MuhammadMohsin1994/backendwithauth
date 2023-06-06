    
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    fees:{
        type:String,
        required:true,
    },
    shortName:{
        type:String,
    },
})

const coursemodel = mongoose.model('course',courseSchema)

module.exports = coursemodel;