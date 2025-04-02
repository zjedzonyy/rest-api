const express = require("express");
const usersControllers = require("../controllers/usersControllers");
const router = express.Router();
const validators = require("../validators/validators");

// REGISTER USER
router.post("/register", validators.validationSignUp, usersControllers.user);

// LOGIN USER
router.post("/login", validators.validationLogin, usersControllers.loginUser);
module.exports = router;
