const express = require('express')
const router = express.Router();
const fileController = require("../controllers/fileController")
const {check} = require("express-validator")
const auth = require("../middleware/auth")


router.post("/", 
auth,
fileController.addFile
);
router.get("/:image", 
fileController.downloadFile
);
router.delete("/:id",
fileController.deleteFile
);

module.exports = router;