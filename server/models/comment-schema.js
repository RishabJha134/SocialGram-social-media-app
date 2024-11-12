const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;
