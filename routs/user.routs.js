const  {authjwt, verifySignup}  = require("../midilerware")
const userController = require("../controller/user.controller")

module.exports = function (app) {

    app.get("/crm/api/v1/users/" ,[authjwt.tokenValid, authjwt.isAdmin], userController.findAll)
    app.get("/crm/api/v1/users/:userId" ,[authjwt.tokenValid,  authjwt.isAdmin] ,userController.findById)
    app.put("/crm/api/v1/users/:userId" ,[authjwt.tokenValid,  authjwt.isAdmin] ,userController.updateById)
}