import User from "../models/User.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const findByEmail = await User.findOne({ email });
    if (findByEmail)
      return res.status(400).json({ message: "User already exists!" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be 6 characters long" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: ["client"],
    });

    const token = genToken({ id: user._id, roles: user.roles });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error: error.message });
  }
};

/* ================= LOGIN ================= */
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password!" });

    const token = genToken({ id: user._id, roles: user.roles });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Signin error", error: error.message });
  }
};

/* ================= LOGOUT ================= */
export const signOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Signout successful!" });
};
