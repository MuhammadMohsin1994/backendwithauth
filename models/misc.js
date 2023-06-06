const mongoose = require('mongoose')

const qualificationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    inst: {
        type: String,
        required: true,
    }
})

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateofBirth: {
        type: Date,
    },
    registrationDate: {
        type: Date,
        default: Date.now(),
    },
    hobbies: {
        type: [String],
    },
    lastQualification:{
        type:[qualificationSchema],
    },
    address:{
        type:String,
        houseNo:String,
    }
})

const usermodel = mongoose.model('user', userSchema)

module.exports = usermodel;