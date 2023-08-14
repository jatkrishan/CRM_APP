const User = require("../model/user.model") 
 const userObjectConvert = require("../units/convertUserObject")
 const constant = require(".././units/constants")
 


 findAllEngineer = async (req, res) => {
  console.log("hi")
  const users = await User.find({userType:constant.userType.engineer}).select({name:1,_id:0,userId:1,userStatus:1,email:1,createdAt:1,updatedAt:1,userType:1})
    try{
       if(users){
   return res.status(201).send(users)
  }
    }catch(e){
      res.status(500).send({message: "some error by user created"})
    }

 }

 findAllCustomer = async (req, res) => {
  const users = await User.find({userType:constant.userType.customer}).select({name:1,_id:0,userId:1,userStatus:1,email:1,createdAt:1,updatedAt:1,userType:1})
    try{
       if(users){
   return res.status(201).send(users)
  }
    }catch(e){
      res.status(500).send({message: "some error by user created"})
    }

 }




 findById = async (req, res) => {
    const Responce = req.params.userId
   const user =  await User.find({userId: Responce})
    try{
      if(user){
       
    res.status(200).send(userObjectConvert.userResponce(user))
   }else{
    return res.status(401).send({message: "User Id is doesn't exccit"})

   }
  }catch(e){
    res.status(500).send({message: "Some internal Error occured"})
  }

 }

 updateById = async (req,res) => {
 
  const Responce = req.params.userId;
   const user =  await User.findOneAndUpdate({userId: Responce},{
    userStatus: req.body.userStatus,
    userType: req.body.userType,
    userName: req.body.userName
   }).exec();
 
 try{
   if(user){
 return res.status(201).send({message: "User update successfully"})
   }else{
return res.status(401).send({message: "User Id is doesn't exccit"})
   }
  }catch(e){
    return res.status(500).send({message: "Some internal Error occured"})
  }

 }

 const authjwt = {

  updateById : updateById ,
    findById  : findById ,
    findAllEngineer   :  findAllEngineer,
    findAllCustomer: findAllCustomer
 }

 module.exports = authjwt;
