const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png",
    },

    // cloudinary ek public_id url generate karke deta hai jiski help se hum crud kar sakte hai image ke saath.
    public_id: {
      type: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
