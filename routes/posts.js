const express = require("express");
const postsControllers = require("../controllers/postsControllers");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.verifyToken, postsControllers.posts);

module.exports = router;
