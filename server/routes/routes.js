const express = require("express");
const {
  signin,
  login,
  userDetails,
  followUser,
  updateProfile,
  searchUser,
} = require("../controllers/user-controller");
const { auth } = require("../middlewares/auth");
const routes = express.Router();

routes.post("/signin", signin);
routes.post("/login", login);
routes.get("/user/:id", auth, userDetails);
routes.put("/user/follow/:id", auth, followUser);
routes.put("/update", auth, updateProfile);
routes.get("/users/search/:query", auth, searchUser);

module.exports = { routes };
