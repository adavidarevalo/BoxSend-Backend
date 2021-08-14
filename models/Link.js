const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  url:{
    type: String,
    unique: true,
    required: true, 
  },
  name: {
    type: String, 
    required: true,
  },
  originalName: {
    type: String, 
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  downloads: {
    type: Number,
    default: 1
  },
  password: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Link", linkSchema)