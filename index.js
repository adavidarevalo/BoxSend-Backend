const express = require("express");
const connectDB = require('./config/db')
const cors = require("cors")
require("dotenv").config({path: "variable.env"})

const app = express();
connectDB()


const CorsOptions = {
  origin: "https://modest-torvalds-20cdbf.netlify.app/"
}
app.use(cors(CorsOptions))

app.use(express.static("uploads"))
const port = process.env.PORT || 4000;


app.use(express.json())

app.use("/api/user", require("./routes/user"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/link", require("./routes/link"))
app.use("/api/file", require("./routes/file"))

app.listen(port, "0.0.0.0", ()=>{
  console.log(`El servidor esta corriendo en el puerto ${port}`)
})