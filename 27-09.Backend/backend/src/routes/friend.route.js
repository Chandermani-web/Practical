import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, removeFriend, listFriends, listFriendRequests, getFriendById} from '../controllers/friendrequest.controller.js';

const router = express.Router();

router.post("/send-request", isLoggedIn, sendFriendRequest);
router.post("/accept-request", isLoggedIn, acceptFriendRequest);
router.post("/reject-request", isLoggedIn, rejectFriendRequest);
router.post("/remove-friend", isLoggedIn, removeFriend);
router.get("/list", isLoggedIn, listFriends);
router.get("/requests", isLoggedIn, listFriendRequests);
router.get("/getfriend/:id", isLoggedIn, getFriendById);

export default router;