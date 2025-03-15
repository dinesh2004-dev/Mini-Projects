const jwt = require("jsonwebtoken");

const { jwt_admin_password } = require("../config.js");

function adminMiddleware(req,res,next){

    const token = req.headers.token;

    const decode = jwt.verify(token,jwt_admin_password);

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

    adminMiddleware : adminMiddleware
}