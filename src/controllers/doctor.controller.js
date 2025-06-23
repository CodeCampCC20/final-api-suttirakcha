import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/createError.js";

export const getDoctorMe = async (req, res, next) => {
  const { id } = req.doctor;
  const doctor = await prisma.doctor.findFirst({
    where: { id: Number(id) },
    omit: { password: true },
  });

  res.json({ message: "Got the doctor", result: doctor });
};

export const updateDoctorMe = async (req, res, next) => {
  const { id } = req.doctor;
  const { username, specialization, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);
  const newName = await prisma.doctor.update({
    where: { id: Number(id) },
    data: { username, specialization, password: hashPassword },
    omit: { password: true },
  });

  res.json({ message: "username updated", result: newName });
};
