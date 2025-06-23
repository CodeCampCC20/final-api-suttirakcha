import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
    const findUser = await prisma.user.findFirst({ where: { username } });
    if (findUser) {
      createError(400, "User already exists");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashPassword },
      omit: { password: true },
    });

    if (!username || !password || !confirmPassword) {
      createError(400, "Username or password is invalid");
    }

    if (password !== confirmPassword) {
      createError(400, "Password does not match");
    }

    res.json({ message: "Register user Successfully", result: user });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      createError(404, "User not found");
    }

    const comparePassword = bcrypt.compareSync(password, user?.password);

    if (!comparePassword) {
      createError(400, "Password is incorrect");
    }

    const payload = { id: user?.id, username: user?.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    res.json({
      message: "Logged in successfully",
      payload,
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};

export const registerDoctor = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, specialization } = req.body;
    const findDoctor = await prisma.doctor.findFirst({ where: { username } });
    if (findDoctor) {
      createError(400, "Doctor already exists");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const doctor = await prisma.doctor.create({
      data: {
        username,
        password: hashPassword,
        specialization
      },
      omit: { password: true },
    });

    if (!username || !password || !confirmPassword || !specialization) {
      createError(400, "Username, password, or specialization is invalid");
    }

    if (password !== confirmPassword) {
      createError(400, "Password does not match");
    }

    res.json({ message: "Register doctor Successfully", result: doctor });
  } catch (err) {
    next(err);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const doctor = await prisma.doctor.findFirst({ where: { username } });

    if (!doctor) {
      createError(404, "Doctor not found");
    }

    const comparePassword = bcrypt.compareSync(password, doctor?.password);

    if (!comparePassword) {
      createError(400, "Password is incorrect");
    }

    const payload = { id: doctor?.id, username: doctor?.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    res.json({
      message: "Logged in successfully",
      payload,
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};
