const Ticket = require("../model/ticket.model")
 const User = require("../model/user.model")
 const constant = require("../units/constants")
 const sendEmail = require("../units/notificationClient")


 createTicket = async (req,res) => {
  

  const ticketObject = ({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priorty: req.body.priorty,
    reporter: req.userId  //this userId is req to verify token
  })
  //assigen a engineer for user
  
  const count = await User.count({
    userType: constant.userType.engineer,
    userStatus: constant.userStatus.approved})
    const random = Math.floor(Math.random()*count)


    const engineer = await User.findOne({
      userType: constant.userType.engineer,
      userStatus: constant.userStatus.approved
    }).skip(random)

     if(engineer){
      ticketObject.assignee = engineer.userId
     }
     
    //  try{
      const ticket = await Ticket.create(ticketObject)
      
      if(ticket){

        let user = await User.findOneAndUpdate({userId:req.userId},{$set:{
          $push:{ticketsCreated:ticket._id}
        }})
       //update the customer
      //  const user = await User.findOne({
      //   userId: req.userId
      //  })
      
    //  user.ticketsCreated.push(ticket._id)
    //   await user.save()

      //update engineer
    
      if(engineer){

        await User.findOneAndUpdate({userId:engineer.userId},{
          $set:{
            $push:{
              ticketAssigen:ticket._id
            }
          }
        })
          
      //   engineer.ticketAssigen.push(ticket._id)
      //   await engineer.save()
      }
     
      //Send email notifaction 
      // sendEmail(ticket._id, `Ticket with ticketId ${ticket._id} updated and is in status ${ticket.status}`, ticket.description, [user.email, engineer.email], ticket.reporter )
      sendEmail(ticket._id, `Ticket with ticketId ${ticket._id} updated and is in status ${ticket.status}`, ticket.description, [user.email, engineer.email], ticket.reporter)      

         return  res.status(200).send(ticket)
    
      }

    //  }catch(e){
    //   res.status(500).send({message: "Error while occured"})
    //  }
    

 }

 updateTicketById = async (req,res) => {
    
  const ticket = await Ticket.findOne({_id: req.params.id})
 
    const user = await User.findOne({userId: req.userId})
      

  if(user && user.userType == constant.userType.admin){
        ticket.title = req.body.tital != undefined ? req.body.tital: ticket.title,
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description,
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status,
        ticket.priorty = req.body.priorty != undefined ? req.body.priorty :ticket.priorty 


        var update = await ticket.save()
        return res.status(200).send(update)
    
  }else{
        return res.status(403).send({message: "Only updte user by created ticket "})
  }
    
 }
 
 
 getOneTicket = async (req, res) => {
 
  const ticket = await Ticket.findOne({_id: req.params.id, reporter: req.userId})
    if(ticket){
    
    return res.status(200).send(ticket)

}else{
    return res.status(403).send({message: "Error! invalid ticket"})
}
}
 
 
 getAllTcketOfCustomer = async (req,res) => {

  const ticket = await Ticket.find({reporter: req.userId})
  try{
     if(ticket){
 return res.status(201).send(ticket)
}
  }catch(e){
    res.status(500).send({message: "some error by user created"})
  }


 }

 getAllTcketOfEngineer = async (req,res) => {

   
   


  const ticket = await Ticket.find({assignee: req.userId})
  try{
     if(ticket){
 return res.status(201).send(ticket)
}
  }catch(e){
    res.status(500).send({message: "some error by user created"})
  }


 }

 getAllTcketOfAdmin = async (req,res) => {

  const tickets = await Ticket.find({})
  try{
     if(tickets){
 return res.status(201).send(tickets)
}
  }catch(e){
    res.status(500).send({message: "some error by user created"})
  }


 }

updateAdminById = async (req,res) => {
 
  const Responce = req.params.userId;
   const user =  await User.findOneAndUpdate({userId: Responce},{
    userStatus: req.body.userStatus,
    description: req.body.description,
    tital: req.body.tital,
    status: req.body.status,
    priorty: req.body.priorty 
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

 getCount = async(req,res)=>{

     const {query} = req.query
     if(query === 'ticket'){
      var counts = await Ticket.aggregate([{
        $group:{
          _id:'$status',
          count:{$sum:1}
        }
      }])
     }else if(query === "engineer"){
        counts = await User.aggregate([
          {
            $match:{userType:constant.userType.engineer}
          },
          {
              
          $group:{
            _id:'$userStatus',

            count:{$sum:1}
          }
        }])
     }else if(query==="user"){
      counts = await User.aggregate([
        {
          $match:{userType:constant.userType.customer}
        },
        {
        $group:{
          _id:"$userStatus",
          count:{$sum:1}
        }
      }])
     }else{
      return res.status(404).json({message:"you must give currect query"})
     }

  res.status(200).json(counts)

 }



  const ticketController = {
    
    getCount: getCount,
    updateAdminById :updateAdminById ,
    getAllTcketOfAdmin: getAllTcketOfAdmin,
    getAllTcketOfEngineer: getAllTcketOfEngineer,
    getAllTcketOfCustomer:  getAllTcketOfCustomer,
    updateTicketById :  updateTicketById ,
    createTicket:  createTicket,
    getOneTicket: getOneTicket
  }

  module.exports = ticketController;