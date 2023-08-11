const mongoose = require("mongoose")
const {Schema, model} = mongoose
const variable = require("../units/constants")

const ticketSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description : {
        type: String,
        required: true
    },
    priorty : {
    type: Number,
    required: true,
    default: 4
   },
  status: {
       type: String,
       required: true,
       default: "OPEN"
   },
      reporter: {
    type: String,
    default:variable.userType.customer
   
   },
   assignee : {
    type: String
   },
   createdAt: {
    type: Date,
    immutable: true,
    default: () => {return Date.now()}
   },
   updatedAt : {
    type: Date,
    default: () => {return Date.now()}
   }
})

const ticketschema = model("Tickets" , ticketSchema);

module.exports = ticketschema;