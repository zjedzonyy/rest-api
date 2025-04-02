const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPublicPosts() {
  const posts = await prisma.post.findMany({
    where: { public: true },
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

module.exports = {
  getAllPublicPosts,
  createUser,
  existingUser,
  getUserByUsername,
  createPost,
  publishPost,
  getRole,
  getAllPosts,
};
