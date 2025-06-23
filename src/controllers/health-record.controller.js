import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

export const getAllRecords = async (req, res, next) => {
  const { id } = req.user;
  const records = await prisma.healthRecord.findMany({
    where: { userId: Number(id) },
    omit: { userId: true },
  });
  res.json({ message: "Fetched the records", result: records });
};

export const getMyRecord = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const records = await prisma.healthRecord.findFirst({
    where: { id: Number(id), userId: Number(userId) },
    omit: { userId: true },
  });
  res.json({ message: "Fetched my records", result: records });
};

export const createRecord = async (req, res, next) => {
  const { type, value } = req.body;
  const { id } = req.user;

  const record = await prisma.healthRecord.create({
    data: {
      type,
      value,
      userId: Number(id),
    },
    omit: { userId: true },
  });

  if (!record) {
    createError(400, "Invalid record");
  }

  res.json({ message: "Record created", result: record });
};

export const updateRecord = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { type, value } = req.body;
  const record = await prisma.healthRecord.update({
    where: { id: Number(id), userId: Number(userId) },
    data: { type, value },
    omit: { userId: true },
  });

  if (!id || !userId){
    createError(404, "Record not found");
  }

  res.json({ message: "Updated record", result: record });
};

export const deleteRecord = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  if (!id || !userId){
    createError(404, "Record not found");
  }

  await prisma.healthRecord.delete({
    where: { id: Number(id), userId: Number(userId) }
  });

  res.json({ message: "Deleted record" });
};
