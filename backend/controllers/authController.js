import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const registerUser = async (req, res) => {
  const user = await User.create(req.body);

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user && user.password === req.body.password) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};