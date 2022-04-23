import express from "express";
import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost } from "../controllers/postsController.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

// '/posts' prepended
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);

router.post("/", Auth, createPost);
router.patch("/:id", Auth, updatePost);
router.delete("/:id", Auth, deletePost);
router.patch("/:id/like", Auth, likePost);

export default router;
