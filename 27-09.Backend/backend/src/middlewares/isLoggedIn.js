import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id || decoded._id; // handle both cases
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});
