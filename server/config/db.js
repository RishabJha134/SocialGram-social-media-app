const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {connectDB};
