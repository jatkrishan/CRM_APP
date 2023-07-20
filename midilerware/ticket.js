const constant = require("../units/constants")
 

tickeltValdit = (req,res,next) => { 

   if(!req.body.title){
    res.status(401).send({message: "Faild! title not provided"})
   }

   if(!req.body.description){
    res.status(401).send({message: "Faild! description not provided"})
   }

   next();
}

 ticketVerrify = (req, res, next) => {
      const userStatus = req.body.userStatus;
    const statusType = [constant.ticketStatus.blocked,constant.ticketStatus.open,
      constant.ticketStatus.closed,constant.ticketStatus.in_Progress]
   if(userStatus && !statusType.includes(userStatus)){
    res.status(401).send({message: "Faild! ticket status is invalid"})
   }

   next()
    }


const ticketValidRequest = {
  tickeltValdit :  tickeltValdit,
    ticketVerrify : ticketVerrify
}

module.exports = ticketValidRequest;