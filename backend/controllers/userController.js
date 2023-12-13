const User = require("../models/userModel");
var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var verifyToken = require("../helper/tokenVerification");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// -----------------GET REQUESTS

const getUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    if (!allUsers) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      message: "Successfully Fetched !",
      user: allUsers,
    });
  } catch (error) {
    console.error("Error fetching user by name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Successfully Fetched !",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user by name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// -----------------POST REQUESTS

// router.post("/", async (req, res) => {
//   const newUser = new User({ ...req.body });
//   const addedUser = await newUser.save();
//   return res.status(201).json(addedUser);
// });

const createUser = async (req, res) => {
  try {
    const newUser = new User({ ...req.body });
    const addUser = await newUser.save();
    return res.status(200).json({
      message: "Successfully Fetched !",
      user: addUser,
    });
  } catch (err) {
    console.log("Err", err);
    return res.status(500).json({
      message: "Unable to add service at the moment !",
      user: null,
    });
  }
};

// -----------------PUT REQUESTS
const updateUser = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const [affectedRowsCount] = await User.update(
      { role: role },
      { where: { id: userId }, returning: true }
    );

    if (affectedRowsCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updatedUser = await User.findOne({ where: { id: userId } });

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//........................AUTH.................
//Signup api
const signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(500).json({
        message: "That Email id is already taken! Try another one...",
      });
    }

    const hash = await bcrypt.hash(req.body.password, 8);
    const newUser = await User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      contact: req.body.contact,
    });

    res.status(200).json({
      message: "Account Created!",
      user: newUser,
    });
  } catch (err) {
    console.log("Error creating user:", err);
    res.status(500).json({
      message: "Unable to create user at the moment!",
      user: null,
    });
  }
};

//Login api
const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    const result = await bcrypt.compare(req.body.password, user.password);

    if (result) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          name: user.name,
          _id: user.id,
        },
        "pramodCG"
      );

      let userObj = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Assuming these fields exist in your User model
        // Adjust accordingly based on your actual model
        image: user.image,
      };

      res.status(200).json({
        message: "Authorization Successful",
        token,
        user: userObj,
      });
    } else {
      res.status(401).json({
        message: "Authentication Failed",
      });
    }
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).json({
      message: "Authentication Failed",
    });
  }
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  //deleteUser,
  updateUser,
  signup,
  login,
};
