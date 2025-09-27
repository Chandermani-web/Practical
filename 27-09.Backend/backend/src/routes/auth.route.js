import express from 'express';
import { GetProfile, UpdateProfile } from '../controllers/profile.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { login, logout, signup } from '../controllers/auth.controller.js';
const router = express.Router();

// registration, login, logout 
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

// profile update and get
router.put("/updateprofile", isLoggedIn, UpdateProfile);
router.get("/profile", isLoggedIn, GetProfile);

export default router;