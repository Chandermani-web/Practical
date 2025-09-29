import User from "../models/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import upload from "../middlewares/upload.js";

// 🔹 Update profile
export const UpdateProfile = asyncHandler(async (req, res) => {
  console.log("👉 req.user:", req.user);
  console.log("👉 req.body:", req.body);

  const { 
    fullname, 
    bio, 
    location, 
    username, 
    website, 
    phone, 
    dateOfBirth, 
    interests,
    socialLinks 
  } = req.body;

  const existingUser = await User.findById(req.user);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update fields if provided
  if (fullname !== undefined) existingUser.fullname = fullname;
  if (bio !== undefined) existingUser.bio = bio;
  if (location !== undefined) existingUser.location = location;
  if (username !== undefined) existingUser.username = username;
  if (website !== undefined) existingUser.website = website;
  if (phone !== undefined) existingUser.phone = phone;
  if (dateOfBirth !== undefined) existingUser.dateOfBirth = dateOfBirth;
  if (interests !== undefined) existingUser.interests = interests;
  if (socialLinks !== undefined) existingUser.socialLinks = { ...existingUser.socialLinks, ...socialLinks };

  await existingUser.save();
  return res.status(200).json({ 
    message: "Profile updated successfully", 
    user: existingUser 
  });
});

// 🔹 Upload profile picture
export const UploadProfilePic = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const existingUser = await User.findById(req.user);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  existingUser.profilePic = `/uploads/images/${req.file.filename}`;
  await existingUser.save();

  return res.status(200).json({ 
    message: "Profile picture uploaded successfully", 
    profilePic: existingUser.profilePic 
  });
});

// 🔹 Upload cover picture
export const UploadCoverPic = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const existingUser = await User.findById(req.user);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  existingUser.coverPic = `/uploads/images/${req.file.filename}`;
  await existingUser.save();

  return res.status(200).json({ 
    message: "Cover picture uploaded successfully", 
    coverPic: existingUser.coverPic 
  });
});

// 🔹 Get profile
export const GetProfile = async (req, res) => {
  try {
    console.log("👉 req.user:", req.user);

    const existingUser = await User.findById(req.user)
      .select("-password")
      .populate("posts")
      .populate("followers")
      .populate("following");

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: existingUser });
  } catch (err) {
    console.error("👉 GetProfile error:", err);   // full error in backend logs
    return res.status(500).json({ 
      message: "Server error", 
      error: err.message  // send error details to frontend
    });
  }
};
