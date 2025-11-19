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
  adminUpdateAnyUser,
  deleteUser,
} = require("../controllers/users.controller");
// const app = express();

const {
  userValidationMiddileware,
  userVerification,
  adminValidationMiddileware,
  superValidationMiddileware,
  userMiddileware,
} = require("../middleware/users.middleware");
const authorization = require("../middleware/authmiddleware");
const roleAuth = require("../middleware/rolemiddleware");
const roleSuper = require("../middleware/rolesuperadmin");
// const { Authorization } = require("../middleware/authmiddlware.js");
const router = express.Router();

//Super Admin Routes

router.delete("/api/user/superAdmin/:id", findUserAndDelete);
router.post(
  "/api/users/superAdmin",
  authorization,
  roleSuper,
  userValidationMiddileware,
  createUser
);

// admin routes
router.post(
  "/api/users/admin",
  authorization,
  roleAuth,
  adminValidationMiddileware,
  userValidationMiddileware,
  createUser
);
router.get("/api/users/search", authorization, roleAuth, getUserByAge);
router.get("/api/users/:id", authorization, roleAuth, getUserById);
router.get("/api/users", authorization, roleAuth, getAllUser);
router.get("/api/users/email/:email", authorization, roleAuth, getUserByEmail);
router.get(
  "/api/users/details/search",
  authorization,
  roleAuth,
  getUserByAgeLesser
);

router.put(
  "/api/user/admin/:id",
  authorization,
  roleAuth,
  userValidationMiddileware,
  adminUpdateAnyUser
);
router.delete("/api/user/admin/:id", findUserAndDelete);

// user routes
router.post(
  "/api/users",
  userMiddileware,
  userValidationMiddileware,
  createUser
);
router.post("/api/users/login", userVerification, verifyUser);

router.put(
  "/api/users",
  authorization,
  userValidationMiddileware,
  updateUserByID
);

router.delete("/api/users", authorization, deleteUser);
module.exports = router;
