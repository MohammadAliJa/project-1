import { Router } from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.controller.js";
const router = Router();
router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/update/:id').patch(updatePost);
router.route('/getPost/:id').get(getPostById);
router.route('/delete/:id').delete(deletePost);

export default router;
