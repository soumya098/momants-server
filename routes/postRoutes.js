import express from "express";
import { getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from "../controllers/postsController.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

// begins with /posts
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/", Auth, createPost);
router.patch("/:id", Auth, updatePost);
router.delete("/:id", Auth, deletePost);
router.patch("/:id/like", Auth, likePost);

export default router;
