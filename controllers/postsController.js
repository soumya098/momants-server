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

export const getPostsBySearch = async (req, res) => {
	const { q: searchQuery, tags } = req.query;

	try {
		const title = new RegExp(searchQuery, "i");
		const tags_arr = tags.split(",");
		// const posts = await PostModel.where("title").regex(title);
		const posts = await PostModel.find({ $or: [{ title: { $regex: title } }, { tags: { $in: tags_arr } }] });
		res.status(200).send(posts);
	} catch (err) {
		res.status(404).send({ msg: err.message });
	}
};

export const createPost = async (req, res) => {
	const body = req.body;
	const newPost = new PostModel({ ...body, creator: req.userId });

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
	if (!req.userId) return res.status(200).json("User not Authorized");

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json("no post found with that id");
	} else {
		const post = await PostModel.findById(id);
		const index = post.likes.findIndex((id) => id === String(req.userId));
		if (index === -1) {
			//like post
			post.likes.push(req.userId);
		} else {
			//dislike post
			post.likes = post.likes.filter((id) => id !== String(req.userId));
		}
		const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });
		res.status(200).json(updatedPost);
	}
};
