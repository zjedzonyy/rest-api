const expressSession = require("express-session");
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const path = require("node:path");
const passport = require("passport");
const qr = require("./db/queries");
// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
const routerPosts = require("./routes/posts");
const routerUsers = require("./routes/users");
const errorHandler = require("./controllers/errorHandler");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes
app.use("/posts", routerPosts);
app.use("/users", routerUsers);

app.use(errorHandler);
app.listen(3000, () => console.log("Server started!"));
