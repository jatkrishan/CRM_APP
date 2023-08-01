 const { tickeltValdit } = require("../midilerware/ticket")
const Ticket = require("../model/ticket.model")
 const User = require("../model/user.model")
 const constant = require("../units/constants")
 const sendEmail = require("../units/notificationClient")


 exports.createTicket = async (req,res) => {
  const ticketObject = ({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    ticketPerioti: req.body. ticketPerioti,
    reporter: req.userId  //this userId is req to verify token
  })
  //assigen a engineer for user
  const engineer = await User.findOne({
    userType: constant.userType.engineer,
    userStatus: constant.userStatus.approved
  })
    
     if(engineer){
      ticketObject.assignee = engineer.userId
     }
     
     try{
      const ticket = await Ticket.create(ticketObject)
      if(ticket){
       //update the customer
       const user = await User.findOne({
        userId: req.userId
       })
      
     user.ticketsCreated.push(ticket._id)
      await user.save()

      //update engineer

      if(engineer){
        engineer.ticketAssigen.push(ticket._id)
        await engineer.save()
      }
      //Send email notifaction 
      // sendEmail(ticket._id, `Ticket with ticketId ${ticket._id} updated and is in status ${ticket.status}`, ticket.description, [user.email, engineer.email], ticket.reporter )
      sendEmail(ticket._id, `Ticket with ticketId ${ticket._id} updated and is in status ${ticket.status}`, ticket.description, [user.email, engineer.email], ticket.reporter)      


    return  res.status(200).send(ticket)
      }

     }catch(e){
      res.status(500).send({message: "Error while occured"})
     }
    

 }

 exports.updateTicketById = async (req,res) => {
    
  const ticket = await Ticket.findOne({_id: req.params.id})
 
    
  if(ticket && ticket.reporter == req.userId){
        ticket.title = req.body.tital != undefined ? req.body.tital: ticket.title,
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description,
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status,
        ticket.ticketPerioti = req.body.ticketPerioti != undefined ? req.body.ticketPerioti :ticket.ticketPerioti 


        var update = await ticket.save()
        return res.status(200).send(update)
    
  }else{
        return res.status(403).send({message: "Only updte user by created ticket "})
  }
    
 }
 
 
 exports.getOneTicket = async (req, res) => {
 
  const ticket = await Ticket.findOne({_id: req.params.id, reporter: req.userId})
    if(ticket){
    
    return res.status(200).send(ticket)

}else{
    return res.status(403).send({message: "Error! invalid ticket"})
}
}
 
 
 exports.getAllTcket = async (req,res) => {
  const ticket = await Ticket.find({reporter: req.userId})
  try{
     if(ticket){
 return res.status(201).send(ticket)
}
  }catch(e){
    res.status(500).send({message: "some error by user created"})
  }


 }





  