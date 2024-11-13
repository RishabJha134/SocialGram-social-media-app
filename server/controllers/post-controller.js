const User = require("../models/user-model");
const Post = require("../models/post-model");
const Comment = require("../models/comment-schema");
const { cloudinary } = require("../config/cloudinary");
const formidable = require("formidable");
const { default: mongoose } = require("mongoose");

const addPost = async (req, res) => {
  try {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ msg: "Error in form phase" });
      }
      const post = new Post();
      if (fields.text) {
        post.text = fields.text;
      }
      if (files.media) {
        const uploadedImage = await cloudinary.uploader.upload(
          files.media.filepath,
          {
            folder: "Threads_clone_youtube/Posts",
          }
        );
        if (!uploadedImage) {
          return res.status(400).json({ msg: "Error in uploading image" });
        }

        post.media = uploadedImage.secure_url;
        post.public_id = uploadedImage.public_id;
      }
      post.admin = req.user._id;
      const newPost = await post.save();
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { threads: newPost._id },
        },
        { new: true }
      );
      res.status(201).json({ msg: "Post added successfully", newPost });
    });
  } catch (err) {
    res.status(400).json({ msg: "Error in addPost!", err: err.message });
  }
};
const allPost = async (req, res) => {
  try {
    const { page } = req.query;
    let pageNumber = page;
    if (!page || page === undefined) {
      pageNumber = 1;
    }

    const posts = await Post.find({})
      .sort({ createdAt: -1 }) // descending order:- latest post pehle dikhegi.
      .skip((pageNumber - 1) * 3)
      .limit(3)
      .populate({ path: "admin", select: "-password" })
      .populate({ path: "likes", select: "-password" })
      .populate({
        path: "comments",
        populate: {
          // nested populate
          path: "admin",
          model: "user",
        },
      });
    res.status(200).json({ msg: "Posts fetched successfully", posts });
  } catch (err) {
    res.status(400).json({ msg: "Error in allPost!", err: err.message });
  }
};

const deletePost = async (req, res) => {
  //1. agar is post me koi image hai toh hume pehle use cloudinary se delete karna padega due to saving the storage:-
  //2. post ko delete karna padega database me se:-
  //3. jis user ke post me is wale post ki id assign hai matlab ki jis user ne ye post kara hai toh hume us post ka id hatana padega kyoki post ko hume delete karna hai, post ko user model se bhi hatana hoga.
  try {
    // step1:- by taking the post id we check is post exist or not:-
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Please provide post id" });
    }
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // step2:-now we check jis user ne post ko post kara hai wahi user sirf post ko delete kar sakta hai so we have to check userId == post ka jo admin hai(matlab jisne post ko upload kara hai) post adminId.
    const userId = req.user._id.toString();
    const adminId = postExists.admin._id.toString();
    if (userId !== adminId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to delete this post" });
    }

    // here meri hi post hai mai hi apni post ko delete karna chahta hu due to this userId !== adminId

    // step3:- hum post ko delete karne se pehle is post ke media ko cloudinary se delete karna hoga pehle:-
    if (postExists.media) {
      await cloudinary.uploader.destroy(
        postExists.public_id,
        (error, result) => {
          console.log({ error, result });
        }
      );
    }

    // step4:- hum comment me se saare comment delete karenge us post se related:-
    //     Step-by-Step Flow:
    // You found the post you want to delete (e.g., postExists).
    // You looked at all the comments attached to that post (postExists.comments).
    // You told MongoDB to find and delete all those comments from the comments collection.

    //     In short:
    // "Mai comment collection se vo saare comments delete kar raha hu jo us post par kiye gaye the."
    // Koi bhi user ho, bas jo comments us post se jude hain, unhe delete kar diya jaa raha hai.

    await Comment.deleteMany({ _id: { $in: postExists.comments } });

    // step5:- jis post ko hum delete kar rahe hai agar vo post ki id user ke threads,reposts,replies me hai toh waha se bhi delete kardo because jab post hi nahi rahega toh in sab ka kya karenge hum:-

    await User.updateMany(
      {
        $or: [{ threads: id }, { reposts: id }, { replies: id }], // here is post ka id:-
      },
      {
        $pull: {
          threads: id,
          reposts: id,
          replies: id,
        },
      }
    );

    await Post.findByIdAndDelete(id);
    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Error in deletePost!", err: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    // ye id us post ki hai jis post ko hume like ya dislike karna hai:-
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Please provide post id" });
    }
    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // user jis post ko like karna chahta hai agar us post par hum already like kar chuke hai matlab us post ke likes field ke array me humara user id already present hai. toh fir hum unlike kar denge agar nahi hai toh like kar denge:-

    if (postExists.likes.includes(req.user._id)) {
      await Post.findByIdAndUpdate(
        id,
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      return res.status(200).json({ msg: "Unliked post successfully" });
    }

    await Post.findByIdAndUpdate(
      id,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    );
    return res.status(200).json({ msg: "liked post successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Error in likePost!", err: err.message });
  }
};

const repost = async (req, res) => {
  console.log("hello world!");
  try {
    const { id } = req.params; // this is post id jis post ko hum repost kar rahe hai.
    console.log(req.params);
    if (!id) {
      return res.status(400).json({ msg: "Please provide post id" });
    }
    console.log(id);
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // console.log(post)
    // agar userId ke repost ke andar already us post ki id present hai jis post ke id ko hume repost karna hai then it is already reposted:-
    const newId = new mongoose.Types.ObjectId(id);
    if (req.user.reposts.includes(newId)) {
      return res
        .status(400)
        .json({ msg: "You have already reposted this post" });
    }

    console.log(newId);
    console.log(req.user.reposts.includes(newId));

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { reposts: post._id },
      },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json({ msg: "Reposted post successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Error in repost!", err: err.message });
  }
};

const singlePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Please provide post id" });
    }
    const post = await Post.findById(id)
      .populate({ path: "admin", select: "-password" })
      .populate({ path: "likes", select: "-password" })
      .populate({
        path: "comments",
        populate: {
          path: "admin",
        },
      });
    res.status(201).json({ msg: "Post successfully", post });
  } catch (err) {
    res.status(400).json({ msg: "Error in repost!", err: err.message });
  }
};

module.exports = { addPost, allPost, deletePost, likePost, repost, singlePost };
