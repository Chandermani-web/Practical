import Notification from "../models/Notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const notifications = await Notification.find({ user: userId })
        .populate("fromUser", "username profilePic")
        .populate("post", "image video")
        .sort({ createdAt: -1 });

    res.status(200).json({ message: "Notifications fetched", notifications });
});


export const markNotificationRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.body;

    await Notification.findByIdAndUpdate(notificationId, { isRead: true });

    res.status(200).json({ message: "Notification marked as read" });
});
