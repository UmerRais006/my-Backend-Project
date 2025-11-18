require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtVerification = (token) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      console.log("jwt failed !");
      throw err;
    } else {
      console.log("jwt verified !");
      return decode;
    }
  });
//   next();
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};
// jwtVerification();
module.exports = { jwtVerification, generateToken };
// console.log("Generated JWT:", token);
