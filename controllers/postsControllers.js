const qr = require("../db/queries");

async function posts(req, res, next) {
  try {
    let posts;
    // REQ.ROLE JEST TUTAJ UNDEFINED
    if (req.role !== "ADMIN") {
      posts = await qr.getAllPublicPosts();
      res.json(posts);
    }
    posts = await qr.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createPost(req, res, next) {
  try {
    const { title, body, authorId } = req.body;
    await qr.createPost(title, body, authorId);
    res.status(200).json({ message: "Post created!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function publishPost(req, res, next) {
  try {
    const postId = req.body.postId;
    await qr.publishPost(postId);
    res.status(200).json({ message: "Post published!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
module.exports = {
  posts,
  createPost,
  publishPost,
};
