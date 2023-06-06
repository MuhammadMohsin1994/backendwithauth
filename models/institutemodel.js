    
const mongoose = require('mongoose')

const instituteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    adress:{
        type:String,
        required:true,
    },
    shortName:{
        type:String,
    },
    tel:{
        type:String,
        required:true,
    },
})

const institutemodel = mongoose.model('institute',instituteSchema)

module.exports = institutemodel;  