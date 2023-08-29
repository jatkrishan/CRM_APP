const  {authjwt, verifySignup}  = require("../midilerware")
const  {userController}= require("../controller/index")

module.exports = function (app) {

    app.get("/crm/api/v1/admin/engineers" ,[authjwt.tokenValid, authjwt.isAdmin],  userController.findAllEngineer)
    app.get("/crm/api/v1/admin/customers" ,[authjwt.tokenValid, authjwt.isAdmin],  userController.findAllCustomer)
    app.get("/crm/api/v1/users/:userId" ,[authjwt.tokenValid,  authjwt.isAdmin] , userController.findById)
    // app.put("/crm/api/v1/users/:userId" ,[authjwt.tokenValid,  authjwt.isAdmin] , userController.updateById)
    app.put("/crm/api/v1/admin/engineers/:userId" , [authjwt.tokenValid, authjwt.isAdmin] ,  userController.updateEngineer)
    app.put("/crm/api/v1/admin/customers/:userId" , [authjwt.tokenValid, authjwt.isAdmin] ,  userController.updateCustomer)

}