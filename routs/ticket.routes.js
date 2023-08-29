const ticketValidRequest = require("../midilerware/ticket")
const {ticketController} = require("../controller/index")
const validToken = require("../midilerware/authjwt")



module.exports = function (app){

    app.post("/crm/api/v1/tickets/",[validToken.tokenValid,ticketValidRequest.tickeltValdit,ticketValidRequest.ticketVerrify],ticketController.createTicket)
    app.put("/crm/api/v1/tickets/:id" , [validToken.tokenValid,ticketValidRequest.ticketVerrify],ticketController.updateTicketById)
    app.put("/crm/api/v1/tickets/:id" , [validToken.tokenValid,ticketValidRequest.ticketVerrify],ticketController.updateTicketById)
    app.get("/crm/api/v1/tickets/customer" , [validToken.tokenValid],ticketController.getAllTcketOfCustomer)
    app.get("/crm/api/v1/tickets/engineer" , [validToken.tokenValid],ticketController.getAllTcketOfEngineer)
    app.get("/crm/api/v1/tickets/admin" , [validToken.tokenValid],ticketController.getAllTcketOfAdmin)
    app.get("/crm/api/v1/tickets/:id",[validToken.tokenValid],ticketController.getOneTicket)
    app.get("/crm/api/v1/admin/count",[validToken.tokenValid,validToken.isAdmin], ticketController.getCount )

    //Update by admin
    app.put("/crm/api/v1/tickets/admin/:id" , [validToken.tokenValid, validToken.isAdmin],ticketController.updateAdminById)
          
}