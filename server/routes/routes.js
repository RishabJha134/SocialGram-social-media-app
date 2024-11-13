const express = require("express");
const {
  signin,
  login,
  userDetails,
  followUser,
  updateProfile,
  searchUser,
  logout,
  myInfo,
} = require("../controllers/user-controller");
const { auth } = require("../middlewares/auth");
const {
  addPost,
  allPost,
  deletePost,
  likePost,
  repost,
  singlePost,
} = require("../controllers/post-controller");
const routes = express.Router();

routes.post("/signin", signin);
routes.post("/login", login);
routes.get("/user/:id", auth, userDetails);
routes.put("/user/follow/:id", auth, followUser);
routes.put("/update", auth, updateProfile);
routes.get("/users/search/:query", auth, searchUser);
routes.post("/logout", auth, logout);
routes.get("/me", auth, myInfo);
routes.post("/post", auth, addPost);
routes.get("/post", auth, allPost);
routes.delete("/post/:id", auth, deletePost);
routes.put("/post/like/:id", auth, likePost);
routes.put("/repost/:id", auth, repost);
routes.get("/post/:id", auth, singlePost);

module.exports = { routes };
