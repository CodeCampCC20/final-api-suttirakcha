import prisma from "../config/prisma.js";

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
  const { username, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);
  const newName = await prisma.doctor.update({
    data: { username, password: hashPassword },
    where: { id: Number(id) },
    omit: { password: true }
  })

  res.json({ message: "username updated", result: newName });
};
