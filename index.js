// const express = require('express');  for older version of Node
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

//app config
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

//middlewares
//app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//database config
mongoose
	.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("db connected");
		app.listen(PORT, () => console.log(`server running on ${PORT}`)); // listener
	})
	.catch((err) => console.log(`server error: ${err.message}`));
// mongoose.set("useFindAndModify", false);

//api-routes endpoints
app.get("/", (req, res) => {
	res.status(200).send("Welcome to Memories Api");
});
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
