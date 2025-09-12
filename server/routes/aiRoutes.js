import express from "express";
import { generateArticle, generateBlogTitle, generateImage } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-article", auth, generateBlogTitle);
aiRouter.post("/generate-image", auth, generateImage);


export default aiRouter;