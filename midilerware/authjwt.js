const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const User = require("../model/user.model")
const constant = require("../units/constants.js")

tokenValid = (req,res,next) => {
let token = req.headers["x-access-token"]
if(!token){
    return res.status(401).send({message: "Faild! token is not Provided"})
}

jwt.verify(token , config.secretKey, (err, decode) => {
    if(err){
        return res.status(403).send({message: "Faild! token is invalid"})
    }
    req.userId = decode.id
   
})
next()
}

isAdmin = async (req, res, next) => {
const user = await User.findOne({userId: req.userId})

const status = req.body.userStatus
const userSattus = [constant.userStatus.approved,constant.userStatus.pending,constant.userStatus.rejected]

if(status && !userSattus.includes(status)){
    res.status(400).send({message:"Faild! user Status is invalid"})
    return;
}


if(user && user.userType === constant.userType.admin){
   next()
   
}else{
    return res.status(403).send({message: "Only admin are allowed"})
}
}

const authjwt={
tokenValid :  tokenValid,
isAdmin  :  isAdmin 
}

module.exports = authjwt ;