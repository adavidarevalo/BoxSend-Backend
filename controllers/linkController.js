
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "variable.env"})
const Link = require("../models/Link")
const shortid = require("shortid")

exports.newLink = async(req, res, next)=>{
  const {originalName, password, name} = req.body
  const linkContainer = new Link()
  linkContainer.url = shortid.generate()
  linkContainer.name = name
  linkContainer.originalName = originalName
  linkContainer.password = password
  if(req.user){
    linkContainer.author = req.user.id
    const {downloads} = req.body
    linkContainer.downloads = downloads
  }
  try{
    await linkContainer.save()
    return res.json({msg: `${linkContainer.url }`})
    next()
  }catch(error){
    console.log(error)
    next()
  }
}

exports.thereArePass = async(req, res, next)=>{
  const {url} = req.params
  const urlContainer = await Link.findOne({url})
  if(!urlContainer){
     return res.json({data: "File not Found"}) 
    next()
  }
  if(urlContainer.password){
    return res.json({password: true, link: urlContainer.url}) 
  }
  next()
}

exports.getLink = async(req, res, next)=>{

  const {url} = req.params
  const urlContainer = await Link.findOne({url})
  if(!urlContainer){
    return res.status(400).json({msg: "File not Found"})
    next()
  }
  res.json({file: urlContainer.name})
  const {downloads}= urlContainer;
  if(downloads === 1){
    req.file = url 
    await Link.findOneAndDelete({url})
    next()
  } else{
    urlContainer.downloads--;
    await urlContainer.save()
  }
}

exports.allLink= async(req, res, next)=>{
  try {
    const links = await Link.find({}).select("url -_id")
    res.json({links})
  } catch (error) {
    console.log(error)
  }
}

exports.validatePassword = async(req, res, next)=>{
  const {url} = req.params
  try{
    const data = await Link.find({url})
    if(req.body.pass === data[0].password){
      const result = {
        validate: true,
        name: data[0].name
      }
      return res.json(result)
    } else{
      return res.json({msg: "Incorrect Password"})
    }
  }catch(error){
    console.log(error)
  }
  next()
}