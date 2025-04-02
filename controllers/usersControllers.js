const qr = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function user(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    await qr.createUser(username, password);
    res.status(201).json("User has been created successfully!");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function loginUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const username = req.body.username;
    const user = await qr.getUserByUsername(username);
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username",
      });
    }
    const password = req.body.password;

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Incorrect password!",
      });
    }

    // Create JWT
    const secret = process.env.JWT_KEY;
    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Authentication successfull",
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  user,
  loginUser,
};
