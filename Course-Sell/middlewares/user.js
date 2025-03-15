const jwt = require("jsonwebtoken");

const { jwt_user_password } = require("../config.js");

function userMiddleware(req,res,next){

    const token = req.headers.token;

    const decode = jwt.verify(token,jwt_user_password);

    if(decode){
        req.userId = decode.id;

        next();
    }
    else{

        res.status(403).json({

            message : "you are not signed in"
        })
    }

}

module.exports = {

    userMiddleware : userMiddleware
}