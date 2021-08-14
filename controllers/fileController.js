
const User = require("../models/User")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "variable.env"})
const multer = require("multer")
const shortid = require("shortid")
const fs = require("fs")


exports.addFile = async(req, res, next)=>{
  const multerConfig = {
  limits: {fileSize: req.user? 1024 * 1024 *10 : 1024 * 1024},
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb( null, __dirname+"/../uploads" )
    },
    filename: (req, file, cb) =>{
      const extention = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
      cb( null, `${shortid.generate()}${extention}` )
    }
  })
  }
  const upload = multer(multerConfig).single("file")
  upload(req, res, async(error)=>{
    if(!error){
      res.json({file: req.file.filename})
    } else {
      console.log(error)
      return next()
    }
  })
}

exports.deleteFile = async(req, res, next)=>{
    try {
      fs.unlinkSync(__dirname+`/../uploads/${req.file}`)
    } catch (error) {
      console.log(error)
    }
}

exports.downloadFile = (req, res, next)=>{
  const file = __dirname + "/../uploads/" + req.params.image
  res.download(file)
}