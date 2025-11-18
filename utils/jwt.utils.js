require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtVerification = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

module.exports = { jwtVerification, generateToken };
