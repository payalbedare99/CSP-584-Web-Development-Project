const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getUser);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.put("/", userController.updateUser);

// router.delete("/:id", userController.deleteUser);

module.exports = router;
