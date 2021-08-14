const express = require('express')
const router = express.Router();
const authController = require("../controllers/authController")
const {check} = require("express-validator")
const auth = require("../middleware/auth")


router.post("/", 
[
    check("email", "The email is wrong").isEmail(),
    check("password", "The password is require").not().isEmpty()
],
authController.autenticationUser
);
router.get("/",
auth,
authController.UserAtentication
);

module.exports = router;