const { body, validationResult } = require("express-validator");

const usernameErr = {
  required: "Username is required.",
  minLength: "Usernames minimum length: 3",
  alphanumeric: "Username must contain only letter and numbers",
};

const passwordErr = {
  required: "Password is required.",
  minLength: "Passwords minimum length: 5",
};

const validationUsername = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(usernameErr.required)
    .isLength({ min: 3 })
    .withMessage(usernameErr.minLength)
    .isAlphanumeric()
    .withMessage(usernameErr.alphanumeric),
];

const validationPassword = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage(passwordErr.required)
    .isLength({ min: 3 })
    .withMessage(passwordErr.minLength),
];

const validationSignUp = [validationUsername, validationPassword];

const validationLogin = [
  body("username").trim().notEmpty().withMessage(usernameErr.required),
  body("password").trim().notEmpty().withMessage(passwordErr.required),
];
module.exports = {
  validationSignUp,
  validationLogin,
};
