const qr = require("../db/queries");

async function posts(req, res, next) {
  try {
    const posts = await qr.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  posts,
};
