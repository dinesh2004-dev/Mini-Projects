const express = require("express");

const { userModel } = require("../db");

const { z } = require("zod");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userRouter = express.Router();

const jwt = require("jsonwebtoken");

const { jwt_user_password } = require("../config.js");

userRouter.post("/signup",async function(req,res){

    const requireBody = z.object({
        email : z.string().email(),

        password : z.string().min(8).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[@$!%*?&]/),

        firstName : z.string().max(8),

        lastName : z.string().max(8)
    })

    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    
    if(!parsedDataWithSuccess.success){
          
        res.json({
            message : "Incorrect format",
    
            error : parsedDataWithSuccess.error
        })
    
        return
       }

    const { email , password , firstName , lastName } = req.body;

    // hashing password using bcrypt library
    
    var hashedPassword;
    try{

        const saltRounds = 10;

     hashedPassword = await bcrypt.hash(password,saltRounds);

    //    console.log(hashedPassword);
    }

    catch(error){

        res.json({
            message : "error while hashing password"
        })

        throw error;
    }

    

    // storing to database

    let errorThrown = false;

    try{
           
           await userModel.create({
                email : email,

                password : hashedPassword,

                firstName : firstName,

                lastName : lastName
           })   

           

    }
    catch(error){
           
        res.json({
            message : "user already exist"
        })
        
        errorThrown = true;
    }

    if(!errorThrown){

        res.json({

            message : "user signup"
        })
    }

    

});

userRouter.post("/signin",async function(req,res){

    const { email , password } = req.body;

    const user = await userModel.findOne({

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

               },jwt_user_password);

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

userRouter.get("/purchases",function(req,res){

});

// userRouter.post("/purchase",function(req,res){

// });

module.exports ={
    userRouter: userRouter
}