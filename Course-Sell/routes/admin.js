const express = require("express");

const { adminModel, courseModel } = require("../db.js");

const { z } = require("zod");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const adminRouter = express.Router();

const { jwt_admin_password } = require("../config.js");

const { adminMiddleware } = require("../middlewares/admin.js");



adminRouter.post("/signup",async function(req,res){

    const requireBody = z.object({

        email : z.string().email(),

        password : z.string().min(8).max(12).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*]/),

        firstName : z.string().max(8),

        lastName : z.string().max(8)

    })

    const parse = requireBody.safeParse(req.body);

    if(!parse.success){

        res.json({

            message : "incorrect format",

            error : parse.error
        })

        return;
    }

    const {email , password , firstName , lastName} = req.body;

    

    var hashedPassword;

    try{

        hashedPassword = await bcrypt.hash(password,10);

        
    }

    catch(error){

        res.json({

            message : "error while hashing password"
        });
    }
    


    let errorThow = false;

    try{

        await adminModel.create({
            email : email,

            password : hashedPassword,

            firstName : firstName,

            lastName : lastName
       })   
    }

    
    catch(error){

        res.json({

            message : "user already exist",

        })

        errorThow = true;

       
    }

    if(!errorThow){

        res.json({

            message : "user signup"
        })
    }

    
    


});

adminRouter.post("/signin",async function(req,res){

    const { email , password } = req.body;

    const user = await adminModel.findOne({

        email : email

    });

    if(!user){
         
        res.status(403).json({
            
            message : "No user found"
        })

        return;

    }

    const passwordMatch = await bcrypt.compare(password,user.password);

    if(passwordMatch){

            const token = jwt.sign({

                     id : user._id

               },jwt_admin_password);

            //    do cookie logic

            res.json({
                token : token
            })
    }

    else{

        res.status(403).json({
            
            message : "Invalid username or password"
        })
    }

});

// adminRouter.get("/purchases",function(req,res){

// });

adminRouter.post("/course",adminMiddleware,async function(req,res){

    const  adminId = req.userId;

    const { title, description, imageUrl ,price} = req.body;


    try{
       const course = await courseModel.create({
            title : title,

            description : description,

            imageUrl : imageUrl, // it is better to provide image upload option instead of requesting image url it is discussed in creating a web3 saas in 6hours youtube video

            price : price,

            creatorId : adminId
        })

        res.json({

            message : "course created",

            id : course._id
        })

    }

    catch(error){

        res.json({
            message : "error while uploading to database"
        })
    }



});

adminRouter.put("/course",adminMiddleware,async function(req,res){

    const  adminId = req.userId;

    const { title, description, imageUrl ,price , courseId} = req.body;


    try{
       const course = await courseModel.updateOne({

        _id : courseId,

        creatorId : adminId
       },{
            title : title,

            description : description,

            imageUrl : imageUrl, // it is better to provide image upload option instead of requesting image url it is discussed in creating a web3 saas in 6hours youtube video

            price : price,

            creatorId : adminId
        })

        res.json({

            message : "course updated",

            id : course._id
        })

    }

    catch(error){

        res.json({
            message : "error while updating to database"
        })
    }



});

    



adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){

    const adminId = req.userId;

    const courses = await courseModel.findOne({

        creatorId : adminId
    })

    res.json({
        message : "your Courses",

        courses : courses
    })

});


module.exports ={
    adminRouter: adminRouter
}