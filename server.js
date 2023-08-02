// //import files
const configDb = require("./config/db.config")
const configServer = require("./config/server.config")


// //install connection
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
require("dotenv").config()
app.use(cors())

const mongoose = require("mongoose")
mongoose.connect(configDb.DB_URL+configDb.DB_NAME)
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




app.listen(configServer.PORT, ()=>{
    console.log("Application started on the port " , configServer.PORT)
})