// external importes
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal importes
const User = require("../models/SignupModel");

const loginHandler = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid email and password combination", status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid email and password combination", status: 401 });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "You are successfully logged in", status: 200 });
  } catch (err) {
    console.log(err);
  }
};

module.exports = loginHandler;
