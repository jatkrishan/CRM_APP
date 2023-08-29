const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
   userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
  },
  password: {
    type: String,
    required : true
  },
  userType: {
       type: String,
       required: String,
       default: "CUSTOMER"
  },
  userStatus: {
     type: String,
     required:true,
     default: "PENDING",
     enum:["PENDING","APPROVED"]
  },
  ticketsCreated: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Ticket"
  }],
  ticketAssigen : [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ticket"
  }],
  createdAt: {
      type: Date,
      immutable: true,
      default: () => {return Date.now()} 
  },
  updatedAt: {
        type: Date,
        default: () => {return Date.now()} 
  }

})

module.exports =model("User", userSchema)
