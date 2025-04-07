const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPublicPosts() {
  const posts = await prisma.post.findMany({
    where: { public: true },
    include: {
      author: {
        select: { username: true },
      },
    },
  });

  return posts;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}

async function createPost(title, body, authorId) {
  const post = await prisma.post.create({
    data: {
      title: title,
      body: body,
      authorId: authorId,
    },
  });
}

async function editPost(postId, title, body) {
  await prisma.post.update({
    where: { id: postId },
    data: {
      title: title,
      body: body,
    },
  });
}

async function publishPost(postId) {
  const post = await prisma.post.update({
    where: { id: postId },
    data: { public: true },
  });
}

async function createUser(username, password) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}

async function existingUser(username) {
  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });

  return existingUser;
}

async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  return user;
}

async function getRole(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user.role;
}

async function getPost(postId) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: { username: true },
      },
    },
  });

  return post;
}

async function deletePost(postId) {
  await prisma.post.delete({
    where: { id: postId },
  });
}

async function createComment(postId, body, authorId) {
  await prisma.comment.create({
    data: {
      body: body,
      authorId: authorId,
      postId: postId,
    },
  });
}

async function getComments(postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      author: {
        select: { username: true },
      },
    },
  });

  return comments;
}

async function getComment(commentId) {
  console.log(commentId);
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  return comment;
}

async function deleteComment(commentId) {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
}

async function getAuthor(authorId) {
  const username = await prisma.user.findUnique({
    where: { id: authorId },
  });

  return username;
}
module.exports = {
  getAllPublicPosts,
  createUser,
  existingUser,
  getUserByUsername,
  createPost,
  publishPost,
  getAllPosts,
  getPost,
  getRole,
  editPost,
  deletePost,
  createComment,
  getComments,
  getComment,
  deleteComment,
  getAuthor,
};
