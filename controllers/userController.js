
const User = require("../models/User")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")

exports.newUser = async(req, res)=>{
  const Error = validationResult(req)
  if(!Error.isEmpty()){
    return res.status(400).json({msg: Error})
  }

  const {email, password} = req.body
  let user = await User.findOne({email})
  if(user){
    return res.status(400).json({msg: "User already exists"})
  }
  user = await new User(req.body)
  const salt = await bcrypt.genSalt(10)
  user.password= await bcrypt.hash(password, salt)
  try {
    user.save()
    res.json({msg: "User created successfully"}) 
  } catch (error) {
    console.log(error)
  }
}