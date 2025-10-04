import express from "express";
import { getNotifications, markNotificationRead } from "../controllers/Notification.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

// Get all notifications for the logged-in user
router.get("/", isLoggedIn, getNotifications);

// Mark a notification as read
router.post("/read", isLoggedIn, markNotificationRead);

export default router;
