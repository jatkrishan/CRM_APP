// //import files
const configUrl = require("./config/configUrl")
const configPort = require("./config/server.config")


// //install connection
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const mongoose = require("mongoose")
mongoose.connect(configUrl.DB_URL)
const db = mongoose.connection


db.on("error" ,() =>{
    console.log("Error while connection to DB ")
})
db.once("open" ,() =>{
    console.log("connected to mongoose DB ")
})



require("./routs/auth.routs")(app)
require("./routs/user.routs")(app)
require("./routs/ticket.routes")(app)




app.listen(configPort.PORT, ()=>{
    console.log("Application started on the port " , configPort.PORT)
})