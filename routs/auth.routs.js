const {verifySignup} = require("../midilerware/index")
const {authController} = require("../controller/index")


module.exports = function (app) {

app.post("/crm/api/v1/signup",[verifySignup.validateSignupRequest],authController.sigiup)
app.post("/crm/api/v1/sigin", authController.sigin)
}