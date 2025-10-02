import mongoose from "mongoose";
import Post from "./post.model.js";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, sparse: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 500 },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    coverPic: { type: String, default: "" },
    dateOfBirth: { type: Date },
    phone: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    interests: [{ type: String }],
    socialLinks: {
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;