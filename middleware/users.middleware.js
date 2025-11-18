const userValidationMiddileware = function (req, res, next) {
  // console.log("hehehehe");
  // console.log(req.decode,"hehehh");
  const { firstName, lastName, email, password, age, phoneNumber } = req.body;
  // console.log(age.length);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    age == null ||
    !phoneNumber
  ) {
    // console.log();
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
  if (phoneNumber.length < 10 || phoneNumber.length > 15) {
    return res
      .status(400)
      .json({ error: "Phone number must be between 10-15 digits (db) " });
  }
  // console.log("hehehehe222222");
  req.data = req.body;
  next();
};

const userVerification = function (req, res, next) {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if ((!email, !password)) {
    return res.status(400).json({ error: " Missing required fields!" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: " Password must be more than 06 characters" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  req.data = req.body;
  next();
};
module.exports = { userValidationMiddileware, userVerification };
