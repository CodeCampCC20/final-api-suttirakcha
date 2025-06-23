import express from "express";
import { getUserMe, updateUserMe } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get('/me', authMiddleware, getUserMe)
router.patch('/me', authMiddleware, updateUserMe)

export default router;