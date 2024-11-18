const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const formidable = require("formidable");
const { cloudinary } = require("../config/cloudinary");

// signin:-
const signin = async (req, res) => {
  // console.log(req.body);
  // console.log(process.env.JWT_SECRET)
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      throw new Error("please provide all fields");
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw new Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    if (!hashedPassword) {
      throw new Error("Error in hashing password");
    }
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    if (!result) {
      throw new Error("Error in saving user");
    }

    const accessToken = JWT.sign(
      { token: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    if (!accessToken) {
      throw new Error("Error in generating access token");
    }
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      partitioned: true,
    });

    res
      .status(201)
      .json({ msg: "User signed in successfully", data: accessToken });
  } catch (err) {
    res.status(400).json({ msg: "Error in signin !", err: err.message });
  }
};

// login:-
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please provide all fields");
    }
    const userExist = await User.findOne({ email: email });
    console.log(userExist);
    if (!userExist) {
      throw new Error("user not found");
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = JWT.sign(
      { token: userExist._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    if (!accessToken) {
      throw new Error("Error in generating access token");
    }
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      partitioned: true,
    });

    res
      .status(200)
      .json({ msg: "User logged in successfully", data: accessToken });
  } catch (err) {
    res.status(400).json({ msg: "Error in login !", err: err.message });
  }
};

// user-details:-
const userDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Please provide  id");
    }
    const user = await User.findById(id)
      .select("-password")
      .populate("followers")
      .populate({
        path: "threads",
        populate: [
          {
            path: "likes",
          },
          {
            path: "comments",
          },
          {
            path: "admin",
          },
        ],
      })
      .populate({ path: "replies", populate: { path: "admin" } })
      .populate({
        path: "reposts",
        populate: [
          {
            path: "likes",
          },
          {
            path: "comments",
          },
          {
            path: "admin",
          },
        ],
      });

    res.status(200).json({ msg: "user details fetched!",user });
  } catch (err) {
    res.status(400).json({ msg: "Error in userDetails !", err: err.message });
  }
};

// follow user:-
const followUser = async (req, res) => {
  try {
    const { id } = req.params; // jisko user ko hum follow karna chahte hai uska id hai:-
    if (!id) {
      throw new Error("Please provide  id");
    }
    const userExists = await User.findById(id);
    if (!userExists) {
      throw new Error("User not found");
    }

    // hum jis user ko follow karna chahte hai agar uske followers me hum already hai matlab us user ke follower ke array me humara user id already present hai. toh fir hum unfollow kar denge agar nahi hai toh follow kar denge:-

    if (userExists.followers.includes(req.user._id)) {
      await User.findByIdAndUpdate(
        userExists._id,
        {
          $pull: { followers: req.user._id },
        },
        {
          new: true,
        }
      );
      return res.status(201).json({ msg: `unfollowed ${userExists.userName}` });
    }

    await User.findByIdAndUpdate(
      userExists._id,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      }
    );
    return res.status(201).json({ msg: `followed ${userExists.userName}` });
  } catch (err) {
    res.status(400).json({ msg: "Error in followUser !", err: err.message });
  }
};

// update profile:-
const updateProfile = async (req, res) => {
  try {
    // Check if the user exists
    const userExists = await User.findById(req.user._id);
    if (!userExists) {
      throw new Error("User not found");
    }

    const form = formidable({});

    // Parsing the form to handle fields and files
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error in formidable:", err); // Fixed error message logging
        return res
          .status(400)
          .json({ msg: "Error in parsing form data", err: err.message });
      }

      console.log("fields:", fields); // Corrected log to display fields object
      console.log("files:", files); // Corrected log to display files object

      // Update bio if text field is present
      if (fields.text) {
        await User.findByIdAndUpdate(
          req.user._id,
          {
            bio: fields.text,
          },
          { new: true }
        );
      }

      // hum pehle check kar lenge ki agar pic pehle se hi exist karta hai toh hum use pehle cloudinary se remove karenge and then hum pic ko updat karenge by help of the public_id. aur if not exist then directly upload kardenge cloudinary par and cloudinary hume ke url generate karke dedega image ka:-

      // Handling profile picture update
      if (files.media) {
        // Remove existing image from Cloudinary if public_id exists
        if (userExists.public_id) {
          await cloudinary.uploader.destroy(
            userExists.public_id,
            (error, result) => {
              if (error) {
                console.error(
                  "Error removing old image from Cloudinary:",
                  error
                );
              } else {
                console.log("Cloudinary remove result:", result);
              }
            }
          );
        }

        console.log("File path:", files.media.filepath); // Corrected to access the correct property
        const uploadedImage = await cloudinary.uploader.upload(
          files.media.filepath,
          {
            folder: "Threads_clone_youtube/Profiles",
          }
        );

        console.log("Uploaded image details:", uploadedImage);
        if (!uploadedImage) {
          throw new Error("Error in uploading image!");
        }

        // Update user profile with new image details
        await User.findByIdAndUpdate(
          req.user._id,
          {
            profilePic: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
          },
          { new: true }
        );
      }

      // Respond with success message after updating profile
      res.status(200).json({ msg: "Profile updated successfully!" });
    });
  } catch (err) {
    console.error("Error in updateProfile:", err.message); // Log error message
    res.status(400).json({ msg: "Error in updateProfile!", err: err.message });
  }
};

// search user:-
const searchUser = async (req, res) => {
  try {
    const query = req.params.query;
    console.log(query);

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ msg: "Search successful", users });
  } catch (err) {
    res.status(400).json({ msg: "Error in searchUser!", err: err.message });
  }
};

const logout = async (req, res) => {
  console.log("logout");
  try {
    // Clear the cookie
    res.cookie("token", "", {
      expires: new Date(0), // Set expiration to the past
      httpOnly: true,       // Ensure cookie is not accessible via JS
      sameSite: "none",     // For cross-origin requests
      secure: true,         // Send cookie only over HTTPS
      path: "/",            // Ensure the path matches where the cookie was set
      partitioned: true,
    });

    // Send a success response
    res.status(200).json({ msg: "Logged out successfully!" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ msg: "Error in logout!", err: err.message });
  }
};


// my info:-
const myInfo = async (req, res) => {
  try {
    res.status(200).json({ me: req.user });
  } catch (err) {
    res.status(400).json({ msg: "Error in myInfo!", err: err.message });
  }
};

module.exports = {
  signin,
  login,
  userDetails,
  followUser,
  updateProfile,
  searchUser,
  logout,
  myInfo,
};
