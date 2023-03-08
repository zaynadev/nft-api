const jwt = require("jsonwebtoken");
const { User } = require("./../models");

const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_AFTER,
    });
    res.status(201).json({ status: "success", token, data: newUser });
  } catch (err) {
    const { errors, code } = err;
    const message =
      code == 11000
        ? "User with this email already exist"
        : "error occured,  please try again!";
    res.status(400).json({
      status: "failed",
      errors,
      message,
    });
  }
};

module.exports = { signup };
