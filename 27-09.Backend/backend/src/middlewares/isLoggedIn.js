import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user object
    const user = await User.findById(decoded.id || decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user; // ✅ Now req.user is an object
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});
