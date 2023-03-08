const jwt = require("jsonwebtoken");
const { User } = require("./../models");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_AFTER,
  });
};

const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = createToken(newUser._id);
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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user =
    email && password
      ? await User.findOne({ email }).select("+password")
      : undefined;
  if (!user || !(await user.passwordIsCorrect(password, user.password))) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid email or password",
    });
  }
  const token = createToken(user._id);
  res.status(201).json({ status: "success", token });
};

const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  let token = undefined;
  if (authorization && authorization.includes("Bearer")) {
    token = authorization.split(" ")[1];
  }
  try {
    const { id, exp } = token
      ? await jwt.verify(token, process.env.JWT_SECRET)
      : { id: undefined, exp: undefined };
    const user = id ? await User.findById(id) : undefined;
    const expired = exp ? Date.now() > exp : false;
    if (!user || !expired) {
      const message = expired ? "Token expired" : "Invalid token";
      return res.status(400).json({
        status: "failed",
        message,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid token",
    });
  }

  next();
};

module.exports = { signup, login, isAuthenticated };
