const express = require("express");
const postsControllers = require("../controllers/postsControllers");
const authController = require("../controllers/authController");
const { authorize } = require("passport");

const router = express.Router();

// GET ALL PUBLISHED POSTS || GET ALL POSTS IF YOU ARE AN ADMIN
router.get("/", authController.verifyToken, postsControllers.posts);

// GET A SINGLE POST
// post must be public OR you must be an author of that post OR have admin permissions
router.get("/:postId", authController.verifyToken, postsControllers.getPost);

// CREATE POST IF YOU ARE AN EDITOR OR MORE
router.post(
  "/",
  authController.verifyToken,
  authController.authorizeRoles("EDITOR"),
  postsControllers.createPost
);

// EDIT POST
// you must be an author of that post OR have admin permissions
router.put("/:postId", authController.verifyToken, postsControllers.editPost);

// PUBLISH POSTS IF YOU ARE AN ADMIN
router.post(
  "/:postId/publish",
  authController.verifyToken,
  authController.authorizeRoles("ADMIN"),
  postsControllers.publishPost
);

router.delete(
  "/:postId",
  authController.verifyToken,
  authController.authorizeRoles("ADMIN"),
  postsControllers.deletePost
);

// /post/:postId/comments

// CREATE COMMENT ONLY IF POST IS PUBLIC
router.post(
  "/:postId/comments",
  authController.verifyToken,
  postsControllers.createComment
);

// GET ALL COMMENTS FOR POST
router.get(
  "/:postId/comments",
  authController.verifyToken,
  postsControllers.getComments
);

// DELETE A COMMENT
// you must have admin permissions OR be author of the comment
router.delete(
  "/comments/:commentId",
  authController.verifyToken,
  postsControllers.deleteComment
);

module.exports = router;
