const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    text: {
      type: String,
    },
    media: {
      type: String,
    },
    public_id: {
      type: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model("post",postSchema);

module.exports = post;


