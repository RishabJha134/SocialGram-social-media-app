const User = require("../models/user-model");
const Post = require("../models/post-model");
const Comment = require("../models/comment-schema");
const  mongoose  = require("mongoose");

const addComment = async (req, res) => {
  try {
    // id jis post par hume comment karna hai:-
    const { id } = req.params;
    const { text } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "id is required !" });
    }
    if (!text) {
      return res.status(400).json({ msg: "text is required !" });
    }
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    const comment = new Comment({
      text,
      admin: req.user._id,
      post: postExists._id,
    });

    const newComment = await comment.save();
    await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: newComment._id },
      },
      {
        new: true,
      }
    );
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { replies: newComment._id },
      },
      { new: true }
    );
    res.status(200).json({ msg: "Comment created successfully" });
  } catch {
    res.status(404).json({ msg: "Error in addComment", err: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    // postId-> jis post par comment hai us post ka id and id-> us comment ki id jisko hume delete karna hai.
    const { postId, id } = req.params;
    if (!postId || !id) {
      return res.status(400).json({ msg: "postId and id are required!" });
    }
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ msg: "Post not found!" });
    }
    const commentExists = await Comment.findById(id);
    if (!commentExists) {
      return res.status(404).json({ msg: "Comment not found!" });
    }

    const newId = new mongoose.Types.ObjectId(id);
    if (postExists.comments.includes(newId)) {
      const id1 = commentExists.admin._id.toString();
      const id2 = req.user._id.toString();
      // yeh comment maine hi kiya hai ki nahi?
      if (id1 !== id2) {
        return res
          .status(400)
          .json({ msg: "you are not authorize to delete the comment !" });
      }
      // post me se comment delete karna hai:-
      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: id },
        },
        {
          new: true,
        }
      );

      // user me se comment delete karna hai:-
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { replies: id },
        },
        {
          new: true,
        }
      );

      // finally delete the comment:-
      await Comment.findByIdAndDelete(id);
      return res.status(200).json({ msg: "Comment deleted successfully" });
    }
    res.status(201).json({ msg: "this post does not include the comment" });
  } catch (err) {
    res.status(404).json({ msg: "Error in deleteComment", err: err.message });
  }
};

module.exports = { addComment, deleteComment };
