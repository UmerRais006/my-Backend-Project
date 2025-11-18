const { jwtVerification } = require("../utils/jwt.utils");

const authorization = async (req, res, next) => {
  // console.log(req.headers);

  const Auth = req.headers.authorization;
  const token = Auth.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  jwtVerification(token);
  next();
};

module.exports = authorization;
