const express = require("express");
const { signin } = require("../controllers/user-controller");
const routes = express.Router();

routes.post("/signin",signin);

module.exports = {routes};