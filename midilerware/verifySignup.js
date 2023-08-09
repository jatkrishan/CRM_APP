const User = require("../model/user.model")
const constant = require("../units/constants")
validateSignupRequest = async(req,res,next) => {
//1 name
if(!req.body.name){
    res.status(500).send({message:"Faild! Name is Not Provid"})
    return;
}
//2 userId
if(!req.body.userId){
    res.status(500).send({message:"Faild! userId is Not Provid"})
    return
}
//3 check userId alredy excit
 const user = await User.findOne({userId:req.body.userId})

 if(user != null){
    res.status(400).send({massage: "Faild! User is alredy present"})
   return;
}
//4 email valid
const email = await User.findOne({email: req.body.email})
if(email != null){
    res.status(400).send({massage: "Faild! email is alredy present"})
   return;
}
//5 email check
if(!req.body.email){
    res.status(400).send({massage: "Faild! email is  not provided"})
   return;
}


//6 password valid
if(!req.body.password){
    res.status(400).send({message:"Faild! password is Not Provid"})
    return
}
//7 valid userType
const userType = req.body.userType;
const validUserTYpes = [constant.userType.admin,constant.userType.customer,constant.userType.engineer,constant.userType.creatLead]

if(userType && !validUserTYpes.includes(userType)){
    res.status(400).send({message:"Faild! user Status is invalid"})
    return;
}

next()

}


const verifySignup = {
    validateSignupRequest : validateSignupRequest
}

module.exports = verifySignup;