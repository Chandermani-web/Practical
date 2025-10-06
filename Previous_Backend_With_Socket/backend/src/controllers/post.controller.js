import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import Notification from '../models/Notification.model.js';
import User from '../models/auth.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createNotification } from './Notification.controller.js';
import { io } from '../index.js';

// Create a new post
export const createPost = asyncHandler(async (req, res) => {
    const content = req.body.content;
    const user = req.user._id;

    if (!content && !req.file) {
        return res.status(400).json({ message: 'Content is required' });
    }

    let image = '';
    let video = '';
    if (req.file) {
        if (req.file.mimetype.startsWith('image')) image = req.file.path;
        if (req.file.mimetype.startsWith('video')) video = req.file.path;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newPost = new Post({ user, content, image, video });
        await newPost.save({ session });
        await User.findByIdAndUpdate(
            user,
            { $push: { posts: newPost._id } },
            { session }
        );

        io.emit("newPost", newPost);

        // ✅ Fetch the full user document first
        const loggedInUser = await User.findById(user).populate('friends');
        const friends = loggedInUser.friends || [];

        // ✅ Notify all friends about the new post
        for (const friend of friends) {
            await createNotification({
                toUser: friend._id, // receiver
                type: 'post',
                fromUser: user, // sender
                post: newPost._id,
                message: `${loggedInUser.username} uploaded a new post`,
            });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Post created successfully',
            post: newPost,
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Update a post
export const updatePost = asyncHandler(async (req, res) => {
    const { content, image, video } = req.body;
    const postId = req.params.id;
    const userId = req.user._id || req.user;

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Authorization check
    if (post.user.toString() !== userId.toString()) {
        return res
            .status(403)
            .json({ message: 'Not authorized to update this post' });
    }

    post.content = content || post.content;
    post.image = image || post.image;
    post.video = video || post.video;

    const updatedPost = await post.save();

    res.status(200).json({
        message: 'Post updated successfully',
        success: true,
        post: updatedPost,
    });
});

// Delete a post
// Delete a post
export const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id || req.user;

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Only author can delete
    if (post.user.toString() !== userId.toString()) {
        return res
            .status(403)
            .json({ message: 'Not authorized to delete this post' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await Post.findByIdAndDelete(postId, { session });
        await User.findByIdAndUpdate(
            userId,
            { $pull: { posts: postId } },
            { session }
        );
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export const likeAndUnlikePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id || req.user; // Assuming user ID is available in req.user
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
        post.likes.pull(userId);
        await post.save();
        return res.status(200).json({
            message: 'Post Unliked successfully',
            success: true,
            updatedLikes: post.likes,
            post,
        });
    } else {
        post.likes.push(userId);
        await post.save();

        // Emit to all users
        io.emit("updateLikes", { postId: post._id, likes: post.likes });

        if(userId.toString() !== post.user.toString()){
            await createNotification({
            toUser: post.user,
            type: 'like',
            fromUser: userId,
            post: postId,
            message: `${req.user.username} liked your post`,
        });
        }

        return res.status(200).json({
            message: 'Post liked successfully',
            success: true,
            updatedLikes: post.likes,
            post,
        });
    }
});

// Get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .populate('user', 'username profilePic ')
        .sort({ createdAt: -1 });
    res.status(200).json(posts);
});

// Get a post by ID
export const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('user', 'username avatar')
        .populate('comments.user', 'username avatar');
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
});

// Add a comment to a post
// Add a comment to a post
export const addComment = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id || req.user;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Add comment to post
    const newComment = { user: userId, text };
    post.comments.push(newComment);

    // Save post
    await post.save();

    // Get the ObjectId of the newly added comment
    const addedComment = post.comments[post.comments.length - 1];

    io.emit("newComment", { postId: post._id, comment: addedComment });

    // Send notification only if the comment is on someone else's post
    if (post.user.toString() !== userId.toString()) {
        await createNotification({
            toUser: post.user,        // post owner
            fromUser: userId,         // commenter
            type: 'comment',
            post: post._id,
            comment: addedComment._id,  // <-- ObjectId of the comment
            message: `${req.user.username} commented on your post`,
        });
    }

    res.status(201).json({
        message: 'Comment added successfully',
        updatedComments: post.comments,
        post,
    });
});


export const getComments = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate(
        'comments.user',
        'username avatar profilePic'
    );
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post.comments);
});


export const deleteComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const userId = String(req.user._id);

  const post = await Post.findById(postId);
  if (!post) {
      return res.status(404).json({ message: 'Post not found' });
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
  }

  if (String(comment.user) !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
  }

  // ✅ Instead of comment.remove(), use pull()
  post.comments.pull(commentId);
  await post.save();

  res.status(200).json({ message: 'Comment deleted successfully', updatedComments: post.comments });
});