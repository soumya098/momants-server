import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		title: String,
		message: String,
		creator: String,
		userName: String,
		tags: [String],
		imageFile: String,
		likes: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
