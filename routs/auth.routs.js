const {verifySignup} = require("../midilerware")
const authController = require("../controller/authController")


module.exports = function (app) {

app.post("/crm/api/v1/signup",[verifySignup.validateSignupRequest],authController.sigiup)
app.post("/crm/api/v1/sigin", authController.sigin)
}