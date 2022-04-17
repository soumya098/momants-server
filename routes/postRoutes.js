import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/postsController.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", Auth, createPost);
router.patch("/:id", Auth, updatePost);
router.delete("/:id", Auth, deletePost);
router.patch("/:id/like", Auth, likePost);

export default router;
