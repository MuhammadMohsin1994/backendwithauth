const express = require('express')
const mongoose = require('mongoose')
const Studentroute = require("./router/studentRouter")
const Instituteroute = require("./router/InstituteRoute")
const Teacherroute = require("./router/TeacherRoutes")
const Courseroute = require("./router/CourseRoute")
const userRoute = require("./router/UserRoute")
const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json())

app.use('/api/student', Studentroute)
app.use('/api/institute', Instituteroute)
app.use('/api/teacher', Teacherroute)
app.use('/api/courses', Courseroute)
app.use('/api/user',userRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected")
        app.listen(process.env.PORT, () => {
            console.log('& Server Started')
        })
    })
    .catch((err) => {
        console.log(err)
    })
