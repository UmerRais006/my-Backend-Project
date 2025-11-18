const { decode } = require("jsonwebtoken");
const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt.utils");

async function createUser(req, res) {
  try {
    const { role, firstName, lastName, email, password, age, phoneNumber } =
      req.data;
    const newUser = new User({
      role,
      firstName,
      lastName,
      email,
      password,
      age,
      phoneNumber,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "new user has been created", id: newUser._id });
  } catch (error) {
    console.log(error, "db:");
    return res
      .status(500)
      .json({ message: "User is not added", error: error?.message });
  }
}

async function getAllUser(req, res) {
  try {
    const allUsers = await User.find();

    if (allUsers.length == 0) {
      return res
        .status(500)
        .json({ message: "Users are not availiable in db" });
    }
    console.log(allUsers);
    return res
      .status(200)
      .json({ message: "All users retrieved successfully: ", allUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
}

async function getUserById(req, res) {
  try {
    const userFoundById = await User.findById(req.params.id);
    if (!userFoundById)
      return res.status(404).json({ message: "User is not found by this Id" });
    return res
      .status(200)
      .json({ message: "user is founded : ", userFoundById });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function adminUpdateAnyUser(req, res) {
  try {
    const updateData = req.body;
    const resourceId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(resourceId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User is Updated : ", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: " Internal Server Error!", error: error.message });
  }
}

async function updateUserByID(req, res) {
  try {
    const updateData = req.body;

    const resourceId = req.decode.id;
    const updatedUser = await User.findByIdAndUpdate(resourceId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User is Updated : ", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: " Internal Server Error!", error: error.message });
  }
}

async function findUserAndDelete(req, res) {
  try {
    const userCheck = await User.findById(req.params.id);
    if (userCheck.role === "admin") {
      return res.status(404).json({ message: "Admin cannot be removed " });
    }
    const userFoundById = await User.findByIdAndDelete(req.params.id);

    if (!userFoundById) {
      return res
        .status(404)
        .json({ message: "User is not found by this Id for deletion" });
    }
    return res
      .status(200)
      .json({ message: "user is deleted : ", userFoundById });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error!", error });
  }
}

async function deleteUser(req, res) {
  try {
    const userFoundById = await User.findByIdAndDelete(req.decode.id);
    // console.log(userFoundById,"hehehe");
    if (!userFoundById) {
      return res
        .status(404)
        .json({ message: "User is not found by this Id for deletion" });
    }
    return res
      .status(200)
      .json({ message: "user is deleted : ", userFoundById });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function getUserByEmail(req, res) {
  try {
    const userFoundByEmail = await User.findOne({ email: req.params.email });

    if (!userFoundByEmail) {
      return res
        .status(404)
        .json({ message: "User is not found by this email !", error });
    }
    return res
      .status(200)
      .json({ message: "user is founded with email : ", userFoundByEmail });
  } catch (error) {
    return res.status(200).json({ message: "Internal server error" });
  }
}

async function verifyUser(req, res) {
  try {
    const verifiedUser = await User.findOne({ email: req.data.email });
    if (!verifiedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (verifiedUser.password !== req.data.password) {
      return res
        .status(404)
        .json({ message: " Email or Password is not valid" });
    }
    const token = generateToken({
      id: verifiedUser._id.toString(),
      role: verifiedUser.role,
      fullName: verifiedUser.fullName,
    });

    return res.status(200).json({ message: "User is verified", token: token });
  } catch (error) {
    return res.status(404).json({ message: "Internal server error", error });
  }
}

async function getUserByAge(req, res) {
  try {
    if (req.query.age <= 0)
      return res.status(500).json({ message: "Age must be more than 0" });
    const userFoundByAge = await User.findOne({ age: req.query.age });
    if (!userFoundByAge)
      return res
        .status(400)
        .json({ message: "User not found by this age !!!!!!" });

    return res
      .status(200)
      .json({ message: "user is founded with age : ", user: userFoundByAge });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Please Enter Valid Age  !", error });
  }
}

async function getUserByAgeLesser(req, res) {
  try {
    if (req.query.age <= 0)
      return res.status(404).json({ message: "Age must be more than 0" });
    const userFoundByAge = await User.find({ age: { $lte: req.query.age } });

    if (!userFoundByAge)
      return res
        .status(404)
        .json({ message: "User not found by this age !!!!!!" });

    return res
      .status(200)
      .json({ message: "user is founded with age : ", userFoundByAge });
  } catch (error) {
    res.status(400).json({ message: "Please Enter Valid Age  !", error });
  }
}

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUserByID,
  findUserAndDelete,
  getUserByEmail,
  getUserByAge,
  getUserByAgeLesser,
  verifyUser,
  adminUpdateAnyUser,
  deleteUser,
};
