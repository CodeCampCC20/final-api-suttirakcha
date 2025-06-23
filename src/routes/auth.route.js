import express from "express";
import { loginDoctor, loginUser, registerDoctor, registerUser } from "../controllers/auth.controller.js";
import { loginUserSchema, registerDoctorSchema, registerUserSchema, validate } from "../validators/validator.js";

const router = express.Router();

router.post("/register/user", validate(registerUserSchema), registerUser)
router.post("/login/user", validate(loginUserSchema), loginUser)

router.post("/register/doctor", validate(registerDoctorSchema), registerDoctor)
router.post("/login/doctor", validate(loginUserSchema), loginDoctor)

export default router;