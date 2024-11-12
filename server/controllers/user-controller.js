const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("please provide all fields");
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw new Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    if (!hashedPassword) {
      throw new Error("Error in hashing password");
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    if (!result) {
      throw new Error("Error in saving user");
    }

    const accessToken = JWT.sign({ token: result._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    if (!accessToken) {
      throw new Error("Error in generating access token");
    }
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true, 
    });

    res
      .status(201)
      .json({ msg: "User signed in successfully", data: accessToken });
  } catch (err) {
    res.status(400).json({ msg: "Error in signin !", err: err.message });
  }
};

module.exports = { signin };
