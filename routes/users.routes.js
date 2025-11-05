const express = require("express");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUserByID,
  findUserAndDelete,
} = require("../controllers/users.controller");
const { findByIdAndDelete } = require("../models/user.model");
const router = express.Router();

router.post("/api/users", createUser);
router.get("/api/users", getAllUser);
router.get("/api/users/:id", getUserById);
router.put("/api/users/:id", updateUserByID);
router.delete("/api/users/:id", findUserAndDelete);
module.exports = router;
