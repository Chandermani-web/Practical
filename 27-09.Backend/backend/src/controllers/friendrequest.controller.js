import User from '../models/auth.model.js';
import Friend from '../models/friend.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const sendFriendRequest = asyncHandler(async (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user._id;

    // Validation
    if (!receiverId) {
        return res.status(400).json({ message: 'Receiver ID is required.' });
    }
    if (senderId.toString() === receiverId) {
        return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
    }

    const existingRequest = await Friend.findOne({
        $or: [
            { sender: senderId, receiver: receiverId, status: { $in: ['pending', 'accepted'] } },
            { sender: receiverId, receiver: senderId , status: { $in: ['pending', 'accepted'] } },
        ]
    });

    if (existingRequest) {
        return res.status(400).json({ message: 'Friend request already exists or you are already friends.' });
    }

    const newRequest = new Friend({
        sender: senderId,
        receiver: receiverId,
        status: 'pending',
    });

    await newRequest.save();

    await User.findByIdAndUpdate(senderId, { $addToSet: { following: receiverId } });
    await User.findByIdAndUpdate(receiverId, { $addToSet: { followers: senderId } });

    res.status(201).json({
        message: 'Friend request sent.',
        request: newRequest,
    });
});


export const acceptFriendRequest = asyncHandler(async (req,res) => {
    const { requestId } = req.body;
    const userId = req.user._id;

    if (!requestId) {
        return res.status(400).json({ message: 'Request ID is required.' });
    }
    const request = await Friend.findOne({
        _id: requestId,
        receiver: userId,
        status: 'pending',
    });

    if (!request) {
        return res.status(404).json({ message: 'Friend request not found.' });
    }

    request.status = 'accepted';
    await request.save();

    await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: request.sender }},
        { new: true }
    );

    await User.findByIdAndUpdate(
        request.sender,
        { $addToSet: { friends: userId } },
        { new: true }
    );
    res.status(200).json({ message: 'Friend request accepted.', request });
});

export const rejectFriendRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.body;
    const userId = req.user._id;
    if (!requestId) {
        return res.status(400).json({ message: 'Request ID is required.' });
    }
    const request = await Friend.findOne({
        _id: requestId,
        receiver: userId,
        status: 'pending',
    });

    if (!request) {
        return res.status(404).json({ message: 'Friend request not found.' });
    }

    request.status = 'rejected';
    await request.save();

    // ❌ Remove from following/followers if already added during send
    await User.findByIdAndUpdate(request.sender, { $pull: { following: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { followers: request.sender } });
    res.status(200).json({ message: 'Friend request rejected.', request });
});

export const removeFriend = asyncHandler(async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user._id;
    if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required.' });
    }

    await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
    );
    await User.findByIdAndUpdate(
        friendId,
        { $pull: { friends: userId } },
        { new: true }
    );
    await Friend.findOneAndDelete({
        $or: [
            { sender: userId, receiver: friendId, status: 'accepted' },
            { sender: friendId, receiver: userId, status: 'accepted' },
        ],
    });
    res.status(200).json({ message: 'Friend removed.' });
});

// Get all the friends of the logged-in user
export const listFriends = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('friends', 'username email profilePic phone dateOfBirth friends savedPosts interests socialLinks location website bio fullname coverPic').exec();
    res.status(200).json({ message: "Get all the friends" , friends: user.friends });
});

// Get all incoming friend requests for the logged-in user
export const listFriendRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const requests = await Friend.find({ receiver: userId, status: 'pending' })
        .populate('sender', 'username email profilePic phone dateOfBirth friends savedPosts interests socialLinks location website bio fullname coverPic')
        .exec();
    res.status(200).json({ message: "Friend Request Get Successfully", requests });
});


export const getFriendById = asyncHandler(async (req, res) => {
  const friendId = req.params.id || req.body; // MUST use params

  if (!friendId) {
    return res.status(400).json({ message: 'Friend ID is required.' });
  }

  const friend = await User.findById(friendId)
    .select('username email profilePic phone dateOfBirth friends savedPosts interests socialLinks location website bio fullname coverPic')
    .exec();

  if (!friend) {
    return res.status(404).json({ message: 'Friend not found.' });
  }

  res.status(200).json({ message: 'Friend retrieved successfully.', friend });
});
