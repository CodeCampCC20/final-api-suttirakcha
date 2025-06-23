import prisma from "../config/prisma.js";

export const getUserMe = async (req, res, next) => {
  const { id } = req.user;
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
    omit: { password: true },
  });

  res.json({ message: "Got the user", result: user });
};

export const updateUserMe = async (req, res, next) => {
  const { id } = req.user;
  const { username, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);
  const newName = await prisma.user.update({
    data: { username, password: hashPassword },
    where: { id: Number(id) },
    omit: { password: true }
  })

  res.json({ message: "Username updated", result: newName });
};
