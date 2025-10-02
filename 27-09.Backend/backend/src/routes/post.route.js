import express from 'express';
import { createPost, deletePost, getAllPosts, getPostById, likeAndUnlikePost, updatePost, addComment, getComments, deleteComment } from '../controllers/post.controller.js';
import upload from '../middlewares/upload.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.post('/', isLoggedIn, upload.single('file'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', isLoggedIn, updatePost);
router.delete('/:id', isLoggedIn, deletePost);
router.post('/:id/likeandunlike', isLoggedIn, likeAndUnlikePost);

router.post("/:id/comment", isLoggedIn, addComment);
router.get("/:id/comment", isLoggedIn, getComments);
router.delete("/:id/comment/:commentId", isLoggedIn, deleteComment);
export default router;