const express = require("express");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const { userRouter } = require("./routes/user.js");

const { courseRouter } = require("./routes/course.js");

const { adminRouter } = require("./routes/admin.js");

app = express();

app.use(express.json());

app.use("/user",userRouter);

app.use("/admin",adminRouter);

app.use("/course",courseRouter);

async function main(){

    await mongoose.connect("mongodb+srv://dineshreddy70931:d1d2d%4078@dinesh.ubc5w.mongodb.net/course-app-database");

    app.listen(3001);
    

}

main();