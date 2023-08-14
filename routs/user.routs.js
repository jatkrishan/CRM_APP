const  {authjwt, verifySignup}  = require("../midilerware")
const userController = require("../controller/user.controller")

module.exports = function (app) {
    app.get("/",()=>console.log("hiiii"))

    app.get("/crm/api/v1/admin/engineers" ,[authjwt.tokenValid, authjwt.isAdmin], userController.findAllEngineer)
    app.get("/crm/api/v1/admin/customers" ,[authjwt.tokenValid, authjwt.isAdmin], userController.findAllCustomer)
    app.get("/crm/api/v1/users/:userId" ,[authjwt.tokenValid,  authjwt.isAdmin] ,userController.findById)
    app.put("/crm/api/v1/users/:userId" ,[authjwt.tokenValid,  authjwt.isAdmin] ,userController.updateById)
}