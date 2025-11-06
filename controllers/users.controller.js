const User = require("../models/user.model");

async function createUser(req, res) {
  try {
    const { firstName, lastName, email, password, age, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ error: " Credentials are misiing ! Please Refill the form !" });
    }

    if (firstName < 2) {
      return res
        .status(400)
        .json({ error: " First name must me more than 2 alphabets" });
    }

    if (password < 6) {
      return res
        .status(400)
        .json({ error: "Password must me more than 6 alphabets" });
    }
    if (age < 0) {
      return res.status(400).json({ error: "Age must be more than 1" });
    }
    if (phoneNumber < 10 && phoneNumber > 15) {
      return res
        .status(400)
        .json({ error: "Phone number must be between 10-15 " });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      age,
      phoneNumber,
    });

    await newUser.save();
    // console.log(newUser);
    return res
      .status(201)
      .json({ message: "new user has been created", id: newUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User is not added", error });
  }
}

async function getAllUser(req, res) {
  try {
    const allUsers = await User.find();
    console.log(allUsers.length);
    if (allUsers.length > 0) {
      return res.status(202).json({ message: "All users get: ", allUsers });
    } else {
      res.status(500).json({ message: "Users are not availiable in db" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Users is not fetch !" });
  }
}

async function getUserById(req, res) {
  console.log("e1gygygygygyugyugygygyjgyugyuguiguigui");
  try {
    // console.log(req.params.id);
    console.log("e1gygygygygyugyugygygyjgyugyuguiguigui");
    const userFoundById = await User.findById(req.params.id);
    console.log(userFoundById);
    // cosnole.log("e3");
    if (userFoundById) {
      return res
        .status(202)
        .json({ message: "user is founded : ", userFoundById });
    } else {
      // cosnole.log("e3");
      res.status(500).json({ message: "User is not found by this Id" });
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
        .status(202)
        .json({ message: "User is Updated : ", updatedUser });
    } else {
      res.status(500).json({ message: "User is not Updated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}

async function findUserAndDelete(req, res) {
  try {
    // console.log(req.params.id);
    // cosnole.log("e1");
    const userFoundById = await User.findByIdAndDelete(req.params.id);
    console.log(userFoundById);
    // cosnole.log("e3");
    if (userFoundById) {
      return res
        .status(202)
        .json({ message: "user is deleted : ", userFoundById });
    } else {
      // cosnole.log("e3");
      res
        .status(500)
        .json({ message: "User is not found by this Id for deletion" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "User is not found by this id for delete!", error });
  }
}

async function getUserByEmail(req, res) {
  try {
    // console.log(req.params.id);
    // cosnole.log("e1");
    const userFoundByEmail = await User.findOne({ email: req.params.email });
    // console.log(userFoundById);
    // cosnole.log("e3");
    if (userFoundByEmail) {
      return res
        .status(202)
        .json({ message: "user is founded with email : ", userFoundByEmail });
    } else {
      // cosnole.log("e3");
      res.status(500).json({ message: "User not found by this email !!!!!!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "User is not found by this email !", error });
  }
}

async function getUserByAge(req, res) {
  try {
    // console.log(req.params.id);
    // cosnole.log("e1");
    if (req.query.age <= 0)
      return res.status(500).json({ message: "Age must be more than 0" });
    const userFoundByAge = await User.findOne({ age: req.query.age });
    if (!userFoundByAge)
      return res
        .status(500)
        .json({ message: "User not found by this age !!!!!!" });

    return res
      .status(202)
      .json({ message: "user is founded with age : ", user: userFoundByAge });
  } catch (error) {
    res.status(500).json({ message: "Please Enter Valid Age  !", error });
  }
}

async function getUserByAgeLesser(req, res) {
  try {
    // console.log(req.params.id);
    // cosnole.log("e1");
    if (req.query.age <= 0)
      return res.status(500).json({ message: "Age must be more than 0" });
    const userFoundByAge = await User.find({ age: { $lte: req.query.age } });
    if (!userFoundByAge)
      return res
        .status(500)
        .json({ message: "User not found by this age !!!!!!" });

    return res
      .status(202)
      .json({ message: "user is founded with age : ", userFoundByAge });
  } catch (error) {
    res.status(500).json({ message: "Please Enter Valid Age  !", error });
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
// exports.createUser = (res, req) => {
//   const userData = { ...req.body };
// };
// app.post("/",(res,req)=>
// {
//     new user= req.body;

// })
