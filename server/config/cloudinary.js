const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

// dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: "debffb5tk",
  api_key: "767839345551917",
  api_secret: "8Nm-65hsrASsxGIC4fyicX4yCJI",
});

module.exports = { cloudinary };
