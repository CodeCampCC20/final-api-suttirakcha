import express from "express";
import { getDoctorMe, updateDoctorMe } from "../controllers/doctor.controller.js";
import { doctorAuthMiddleware } from "../middlewares/doctor-auth.middleware.js";

const router = express.Router();
router.get('/me', doctorAuthMiddleware, getDoctorMe)
router.patch('/me', doctorAuthMiddleware, updateDoctorMe)

export default router;