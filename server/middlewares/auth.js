const JWT = require("jsonwebtoken");
const User = require("../models/user-model");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("No token, authorization denied!");
    }
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    // console.log(decodedToken);
    if (!decodedToken) {
      throw new Error("Token is not valid!");
    }
    const user = await User.findById(decodedToken.token)
      .populate("followers")
    //   .populate("threads")
    //   .populate("replies")
    //   .populate("reposts");

    if (!user) {
      throw new Error("User not found!");
    }
    // console.log(req);
    // console.log(req.user);
    req.user = user;
    // console.log(user);
    next();
  } catch (err) {
    res.status(400).json({ msg: "Error !", err: err.message });
  }
};

module.exports = {auth};