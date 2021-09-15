var express = require("express");
const UserController = require("../controllers/UserController");

var router = express.Router();
router.post("/update-profile", UserController.updateUser);

module.exports = router;