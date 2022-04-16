import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		title: String,
		message: String,
		creator: String,
		tags: [String],
		imageFile: String,
		likeCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
