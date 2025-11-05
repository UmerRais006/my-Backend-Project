const express = require("express");
const {createUser,getAllUser, getUserById} = require("../controllers/users.controller");
const router = express.Router();

router.post("/api/users", createUser);
router.get("/api/users", getAllUser);
router.get("/api/users/:id", getUserById);
module.exports = router;
