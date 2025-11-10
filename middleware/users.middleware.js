const emailMiddleware = function (req, res, next) {
  console.log("heheheheheh");
  next();
};

const userValidationMiddileware = function (req, res, next) {
  const { firstName, lastName, email, password, age, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: " Missing required fields!" });
  }

  if (firstName.length < 2) {
    return res
      .status(400)
      .json({ error: " First name must me more than 2 alphabets" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must me more than 6 alphabets" });
  }
  if (age < 1) {
    return res.status(400).json({ error: "Age must be more than 1" });
  }
  if (phoneNumber < 10 && phoneNumber > 15) {
    return res
      .status(400)
      .json({ error: "Phone number must be between 10-15 digits " });
  }

  req.data = req.body;
  next();
};

module.exports = { emailMiddleware, userValidationMiddileware };
