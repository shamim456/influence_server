// controllers/userController.js
const User = require("../models/SignupModel");
const bcrypt = require("bcrypt");

const UserController = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      address,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", status: 400 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth,
      address,
    });
    await newUser.save();

    return res
      .status(200)
      .json({ message: "User registered successfully", status: 200 });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
};

module.exports = UserController;
