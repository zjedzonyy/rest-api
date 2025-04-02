const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
require("dotenv").config();
const qr = require("../db/queries");

async function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Access denied" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await qr.getRole(decoded.userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = { id: decoded.userId, role: user };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

const mapRoles = {
  BASIC: 0,
  EDITOR: 1,
  ADMIN: 10,
};
function checkPermissions(user, requiredRole) {
  return mapRoles[user.role] >= mapRoles[requiredRole];
}

function authorizeRoles(requiredRole) {
  return (req, res, next) => {
    const user = req.user;
    console.log(checkPermissions(user, requiredRole));
    if (!user || !checkPermissions(user, requiredRole)) {
      return res.status(403).json({ message: "You don't have permissions" });
    }
    next();
  };
}

module.exports = { verifyToken, authorizeRoles };
