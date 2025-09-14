import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
await connectCloudinary();

// CORS configuration
app.use(cors({
  origin: 'https://zzai-flax.vercel.app', //frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());

app.options('*', cors());

app.get("/", (req, res) => res.send("server is live!"));

app.use(requireAuth());

app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
