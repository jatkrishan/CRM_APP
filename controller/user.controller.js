const User = require("../model/user.model") 
 const userObjectConvert = require("../units/convertUserObject")
 
 findAll = async (req, res) => {
  const users = await User.find()
    try{
       if(users){
   return res.status(201).send(userObjectConvert.userResponce(users))
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
    findAll   :  findAll
 }

 module.exports = authjwt;