const { response } = require("express");
const { jwtVerification } = require("../utils/jwt.utils");
const User = require("../models/user.model");

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

  try {
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }

  // console.log(user);

  req.decode = decode;

  next();
};
module.exports = authorization;
