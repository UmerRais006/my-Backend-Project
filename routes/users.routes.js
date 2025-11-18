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
  verifyUser,
} = require("../controllers/users.controller");
// const app = express();

const {
  userValidationMiddileware,
  userVerification,
} = require("../middleware/users.middleware");
const authorization = require("../middleware/authmiddleware");
// const { Authorization } = require("../middleware/authmiddlware.js");
const router = express.Router();

router.post("/api/users", userValidationMiddileware, createUser);
router.post("/api/users/login", userVerification, verifyUser);
router.get("/api/users/search", getUserByAge);
router.get("/api/users/details/search", getUserByAgeLesser);
router.get("/api/users", getAllUser);
router.get("/api/users/:id", getUserById);
router.put("/api/users/:id",authorization, userValidationMiddileware, updateUserByID);
router.delete("/api/users/:id", findUserAndDelete);
router.get("/api/users/email/:email", getUserByEmail);

module.exports = router;
