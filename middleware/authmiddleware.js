const { response } = require("express");
const { jwtVerification } = require("../utils/jwt.utils");

const authorization = async (req, res, next) => {
  const Auth = req.headers.authorization;

  if (!Auth || !Auth.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  const token = Auth.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }

  const decode = jwtVerification(token);
  if (!decode) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  req.decode = decode;

  next();
};
module.exports = authorization;
