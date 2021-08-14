
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "variable.env"})

module.exports = (req, res, next) =>{
    const headerToken = req.get("Authorization")
    if(headerToken){
    const token = headerToken.split(" ")[1]
    try {
        const user = jwt.verify(token, process.env.SECRET)
        req.user = user
    } catch (error) {
        console.log("JWT is wrong")
    }
    }
    return next()
}