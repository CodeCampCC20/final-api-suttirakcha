import express from "express";
import { getUserMe, updateUserMe } from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middlewares/user-auth.middleware.js";

const router = express.Router();
router.get('/me', userAuthMiddleware, getUserMe)
router.patch('/me', userAuthMiddleware, updateUserMe)

export default router;