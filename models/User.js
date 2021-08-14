const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true  
  },
  name: {
    type: String, 
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model("User", userSchema)