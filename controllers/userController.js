import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await UserModel.findOne({ email: email });
		if (!existingUser) return res.status(404).json({ message: "User does not exist" });

		const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
		if (!isCorrectPassword) return res.status(400).json({ message: "Invalid Credentials" });

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1hr" });

		res.status(200).send({ profile: existingUser, token: token });
	} catch (error) {
		res.status(500).send({ message: "something went wrong" });
	}
};

export const signUp = async (req, res) => {
	const { email, password, firstName, lastName, confirmPassword } = req.body;
	try {
		const existingUser = await UserModel.findOne({ email: email });
		if (existingUser) return res.status(400).json({ message: "User already exist" });

		if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

		const hashedPassWord = await bcrypt.hash(password, 12);
		const newUser = await UserModel.create({ email: email, password: hashedPassWord, name: `${firstName} ${lastName}` });
		const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", { expiresIn: "1hr" });

		res.status(200).send({ profile: newUser, token: token });
	} catch (error) {
		res.status(500).send({ message: "something went wrong" });
	}
};
