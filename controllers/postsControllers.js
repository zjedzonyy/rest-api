const qr = require("../db/queries");

async function posts(req, res, next) {
  try {
    let posts;
    if (req.user.role !== "ADMIN") {
      posts = await qr.getAllPublicPosts();
    } else {
      posts = await qr.getAllPosts();
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getPost(req, res, next) {
  try {
    let post = await qr.getPost(req.params.postId);
    console.log(req.user);
    if (
      req.user.role !== "ADMIN" &&
      post.public === false &&
      req.user.id !== post.authorId
    ) {
      post = "It's not published yet!";
    }
    res.status(200).json(post);
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

async function editPost(req, res, next) {
  try {
    const postId = req.params.postId;
    const { title, body } = req.body;
    const post = await qr.getPost(postId);
    if (req.user.role !== "ADMIN" && post.authorId !== req.user.id) {
      res.status(403).json({ message: "You don't have required permissions" });
    } else {
      await qr.editPost(postId, title, body);
      res.status(200).json({ message: "Post has been edited!" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function publishPost(req, res, next) {
  try {
    const postId = req.params.postId;
    await qr.publishPost(postId);
    res.status(200).json({ message: "Post published!" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = req.params.postId;
    await qr.deletePost(postId);
    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const commentId = req.params.commentId;
    const comment = await qr.getComment(commentId);

    if (comment.authorId !== req.user.id && req.user.role !== "ADMIN") {
      res.status(403).json({ message: "You don't have required prermissions" });
    } else {
      await qr.deleteComment(commentId);
      res.status(200).json({ message: "Comment has been deleted" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const postId = req.params.postId;
    const post = await qr.getPost(postId);
    if (post.public === false) {
      res.status(403).json({ message: "You can't comment unpublished posts" });
    } else {
      const body = req.body.body;
      const authorId = req.user.id;

      await qr.createComment(postId, body, authorId);

      res.status(200).json({ message: "Comment created!" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getComments(req, res, next) {
  try {
    const postId = req.params.postId;
    const comments = await qr.getComments(postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  posts,
  createPost,
  publishPost,
  getPost,
  editPost,
  deletePost,
  createComment,
  getComments,
  deleteComment,
};
