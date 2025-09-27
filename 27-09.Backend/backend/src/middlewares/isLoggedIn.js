import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});
