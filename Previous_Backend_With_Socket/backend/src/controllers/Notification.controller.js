import Notification from "../models/Notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { io } from "../index.js";

export const createNotification = asyncHandler(
  async ({ toUser, fromUser, type, post, comment, message }) => {
    const newNotification = new Notification({
      toUser,
      fromUser,
      type,
      post: post || null,
      comment: comment || null,
      message,
    });

    await newNotification.save();

    // Populate before emitting
    const populatedNotification = await Notification.findById(newNotification._id)
      .populate("fromUser", "username profilePic")
      .populate("post", "image video content comments");
    // Emit to the specific user's room
    io.to(toUser.toString()).emit("newNotification", populatedNotification);

    return populatedNotification;
  }
);



export const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const notifications = await Notification.find({ toUser: userId })
        .populate("fromUser", "username profilePic")
        .populate("post", "image video content comments")
        .sort({ createdAt: -1 });

    res.status(200).json({ message: "Notifications fetched", notifications });
});


export const markNotificationRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.body;

    await Notification.findByIdAndUpdate(notificationId, { isRead: true });

    res.status(200).json({ message: "Notification marked as read" });
});
