const mongoose = require("mongoose")
require("dotenv").config({path: "variable.env"})

const connectDB = async() =>{
  try{
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log("connectado")
  } catch(error){
    console.log("there was a Error")
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB;