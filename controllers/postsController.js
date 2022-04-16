import PostModel from "../models/post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find();
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ msg: err.message });
	}
};

export const createPost = async (req, res) => {
	const body = req.body;
	const newPost = new PostModel(body);

	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ msg: err.message });
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json("no post found with that id");
	} else {
		const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });
		res.status(200).json(updatedPost);
	}
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json("no post found with that id");
	} else {
		await PostModel.findByIdAndRemove(id);
		res.status(200).json({ msg: "Post Deleted Successfully" });
	}
};

export const likePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json("no post found with that id");
	} else {
		const post = await PostModel.findById(id);
		const updatedPost = await PostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
		res.status(200).json(updatedPost);
	}
};
