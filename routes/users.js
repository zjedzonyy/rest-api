const express = require("express");
const usersControllers = require("../controllers/usersControllers");
const router = express.Router();
const validators = require("../validators/validators");

// REGISTER USER
router.post("/", validators.validationSignUp, usersControllers.user);

// LOG IN
router.post("/login", validators.validationLogin, usersControllers.loginUser);
module.exports = router;
