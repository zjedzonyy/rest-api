const express = require("express");
const postsControllers = require("../controllers/postsControllers");
const authController = require("../controllers/authController");
const { authorize } = require("passport");

const router = express.Router();

router.get(
  "/",
  authController.verifyToken,
  authController.authorizeRoles("ADMIN"),
  postsControllers.posts
);
router.post("/", authController.verifyToken, postsControllers.createPost);

router.post(
  "/publish",
  authController.verifyToken,
  postsControllers.publishPost
);

// router.get(
//     "/",
//     authController.verifyToken,
//     authController.authorizeRoles("ADMIN"),
//     postsControllers.posts
//   );

module.exports = router;
