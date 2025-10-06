import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user who receives
  type: { 
    type: String, 
    enum: ["friend_request", "like", "post", "message", "comment"], 
    required: true 
  },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who triggered
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // related post if any
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }, // reference to comment if any
  message: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;