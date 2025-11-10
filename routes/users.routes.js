const express = require("express");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUserByID,
  findUserAndDelete,
  getUserByEmail,
  getUserByAge,
  getUserByAgeLesser,
} = require("../controllers/users.controller");

const { userValidationMiddileware } = require("../middleware/users.middleware");
const router = express.Router();

router.post("/api/users", userValidationMiddileware, createUser);
router.get("/api/users/search", getUserByAge);
router.get("/api/users/details/search", getUserByAgeLesser);
router.get("/api/users", getAllUser);
router.get("/api/users/:id", getUserById);
router.put("/api/users/:id", userValidationMiddileware, updateUserByID);
router.delete("/api/users/:id", findUserAndDelete);
router.get("/api/users/email/:email", getUserByEmail);

module.exports = router;
