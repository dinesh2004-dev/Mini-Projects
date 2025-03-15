const express = require("express");

const { courseSchema } = require("../db");

const courseRouter = express.Router();


courseRouter.post("/purchase",function(req,res){

});

courseRouter.get("/preview",function(req,res){

});

module.exports = {
    courseRouter : courseRouter
}
