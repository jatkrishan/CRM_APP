const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const User = require("../model/user.model.js")
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

if(user && user.userType === constant.userType.admin){
   next()
}else{
    return res.status(403).send({message: "Only admin are allowed"})
}
}

const authjwt={
tokenValid :  tokenValid,
isAdmin    :  isAdmin 
}

module.exports = authjwt ;