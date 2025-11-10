const User = require("../models/user.model");

async function createUser(req, res) {
  try {
    const { firstName, lastName, email, password, age, phoneNumber } = req.data;
    const newUser = new User({
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
    res.status(500).json({ message: "User is not added", error });
  }
}

async function getAllUser(req, res) {
  try {
    const allUsers = await User.find();
    if (allUsers.length > 0) {
      return res
        .status(200)
        .json({ message: "All users retrieved successfully: ", allUsers });
    } else {
      res.status(500).json({ message: "Users are not availiable in db" });
    }
  } catch (error) {
    res.status(500).json({ message: "Users is not found in database !" });
  }
}

async function getUserById(req, res) {
  try {
    const userFoundById = await User.findById(req.params.id);
    if (userFoundById) {
      return res
        .status(200)
        .json({ message: "user is founded : ", userFoundById });
    } else {
      res.status(404).json({ message: "User is not found by this Id" });
    }
  } catch (error) {
    res.status(500).json({ message: "User is not found by this id!", error });
  }
}

async function updateUserByID(req, res) {
  try {
    const updateData = req.body;
    const resourceId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(resourceId, updateData, {
      new: true,
      runValidators: true,
    });

    if (updatedUser) {
      return res
        .status(200)
        .json({ message: "User is Updated : ", updatedUser });
    } else {
      res.status(404).json({ message: "User is not Updated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}

async function findUserAndDelete(req, res) {
  try {
    const userFoundById = await User.findByIdAndDelete(req.params.id);

    if (userFoundById) {
      return res
        .status(200)
        .json({ message: "user is deleted : ", userFoundById });
    } else {
      res
        .status(404)
        .json({ message: "User is not found by this Id for deletion" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "User is not found by this id for delete!", error });
  }
}

async function getUserByEmail(req, res) {
  try {
    const userFoundByEmail = await User.findOne({ email: req.params.email });

    if (userFoundByEmail) {
      return res
        .status(200)
        .json({ message: "user is founded with email : ", userFoundByEmail });
    } else {
      res.status(404).json({ message: "User not found by this email !!!!!!" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "User is not found by this email !", error });
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
    res.status(400).json({ message: "Please Enter Valid Age  !", error });
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
};
