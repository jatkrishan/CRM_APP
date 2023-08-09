const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const userSchema = new Schema({
  name: {
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
     default: "PENDING"
  },
  ticketsCreated: {
         type: [mongoose.SchemaType.ObjectId],
         ref: "Ticket"
  },
  ticketAssigen : {
          type: [mongoose.SchemaType.ObjectId],
          ref: "Ticket"
  },
  gender: {
      type:String,
      required:true
  },
  address: {
    type:String,
    required:true
},
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

let User = model("User", userSchema)
module.exports = User;