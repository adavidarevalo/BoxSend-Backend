
const User = require("../models/User")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "variable.env"})

exports.autenticationUser = async(req, res, next)=>{
  const Error = validationResult(req)
  if(!Error.isEmpty()){
    return res.status(400).json({msg: Error})
  }
  const {email, password} = req.body
  let user = await User.findOne({email})
  if(!user){
    res.status(401).json({msg: "Email does not exist"})
    return next()
  }
  if(bcrypt.compareSync(password, user.password)){
      const token = jwt.sign({
          id: user._id,
          name: user.name
      }, process.env.SECRET, {
          expiresIn: "8h"
      })
      res.json({token})
      
  } else{
      res.status(401).json({msg: "Password is incorrect"})
      return next()
  }
}

exports.UserAtentication = async(req, res, next)=>{
    res.json({user: req.user})
    return next()
}