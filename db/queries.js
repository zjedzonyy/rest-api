const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPosts() {
  const posts = await prisma.post.findMany();

  return posts;
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

module.exports = {
  getAllPosts,
  createUser,
  existingUser,
  getUserByUsername,
};
