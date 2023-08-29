const User = require("../model/user.model")
const constant = require("../units/constants")
validateSignupRequest = async(req,res,next) => {
//1 name
if(!req.body.userName){
    return res.status(400).json({message:"Faild! userName is Not Provid"})
   
}
//2 userId
if(!req.body.userId){
    return res.status(400).json({message:"Faild! userId is Not Provid"})
   
}
//3 check userId alredy excit
 const user = await User.findOne({userId:req.body.userId})

 if(user != null){
    return res.status(400).json({massage: "Faild! User is alredy present"})
  
}
//4 email valid
const email = await User.findOne({email: req.body.email})
if(email != null){
    return res.status(400).json({massage: "Faild! email is alredy present"})
  
}
//5 email check
if(!req.body.email){
    return res.status(400).json({massage: "Faild! email is  not provided"})
  
}


//6 password valid
if(!req.body.password){
    return res.status(400).json({message:"Faild! password is Not Provid"})
    
}
//7 valid userType
if(!req.body.userType){
    return res.status(400).json({message:"Faild! userType is Not Provid"})
}


const userType = req.body.userType;
const validUserTYpes = [constant.userType.admin, constant.userType.customer, constant.userType.engineer]

if(userType && !validUserTYpes.includes(userType)){
    res.status(400).json({message:"Faild! user userStatus is invalid"})
    return;
}

next()

}


const verifySignup = {
    validateSignupRequest : validateSignupRequest
}

module.exports = verifySignup;