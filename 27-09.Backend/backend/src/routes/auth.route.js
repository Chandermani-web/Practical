import express from 'express';
import { GetProfile, UpdateProfile, UploadProfilePic, UploadCoverPic } from '../controllers/profile.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { login, logout, signup, AllUser } from '../controllers/auth.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// registration, login, logout 
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/AllUser", isLoggedIn, AllUser);

// profile update and get
router.put("/updateprofile", isLoggedIn, UpdateProfile);
router.get("/me", isLoggedIn, GetProfile);

// photo upload routes
router.post("/upload-profile-pic", isLoggedIn, upload.single('profilePic'), UploadProfilePic);
router.post("/upload-cover-pic", isLoggedIn, upload.single('coverPic'), UploadCoverPic);


export default router;