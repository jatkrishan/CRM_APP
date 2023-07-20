const ticketValidRequest = require("../midilerware/ticket")
const TicketController = require("../controller/ticket.controller")
const validToken = require("../midilerware/authjwt")


module.exports = function (app){

    app.post("/crm/api/v1/tickets/",[validToken.tokenValid,ticketValidRequest.tickeltValdit,ticketValidRequest.ticketVerrify],TicketController.createTicket)
    app.put("/crm/api/v1/tickets/:id" , [validToken.tokenValid,ticketValidRequest.ticketVerrify],TicketController.updateTicketById)
    app.get("/crm/api/v1/tickets/" , [validToken.tokenValid],TicketController.getAllTcket)
    app.get("/crm/api/v1/tickets/:id",[validToken.tokenValid],TicketController.getOneTicket)
}