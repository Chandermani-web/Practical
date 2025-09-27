import User from "../models/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 🔹 Update profile
export const UpdateProfile = asyncHandler(async (req, res) => {
  console.log("👉 req.user:", req.user);
  console.log("👉 req.body:", req.body);

  const { fullname, bio, location, profilePic, username } = req.body;

  const existingUser = await User.findById(req.user);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  existingUser.fullname = fullname || existingUser.fullname;
  existingUser.bio = bio || existingUser.bio;
  existingUser.location = location || existingUser.location;
  existingUser.profilePic = profilePic || existingUser.profilePic;
  existingUser.username = username || existingUser.username;

  await existingUser.save();
  return res.status(200).json({ message: "Profile updated successfully" });
});


// 🔹 Get profile
export const GetProfile = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.user)
    .select("-password")
    .populate("posts")
    .populate("followers")
    .populate("following");

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user: existingUser });
});
