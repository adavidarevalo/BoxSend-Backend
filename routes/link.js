const express = require('express')
const router = express.Router();
const linkController = require("../controllers/linkController")
const auth = require("../middleware/auth")
const {check} = require("express-validator")
const fileController = require("../controllers/fileController")

router.post("/", 
[
    check("originalName", "The archive is required").not().isEmpty()
],
auth,
linkController.newLink
);

router.get("/:url", 
linkController.thereArePass,
linkController.getLink,
fileController.deleteFile
);

router.get("/", 
linkController.allLink
);

router.post("/:url",
linkController.validatePassword
)

module.exports = router;