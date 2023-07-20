const verifySignup = require("./verifySignup");
const authjwt = require("./authjwt")
const ticketValidRequest = require("./ticket")
module.exports = {
    verifySignup  : verifySignup ,
    authjwt : authjwt  ,
    ticketValidRequest : ticketValidRequest
}
