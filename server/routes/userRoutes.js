import express from "express";
import {
  getPublishCreations,
  getUserCreations,
  toggleLikeCreation,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/get-user-creations", auth, getUserCreations);
userRouter.get("/get-published-creations", auth, getPublishCreations);
userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);

export default userRouter;
