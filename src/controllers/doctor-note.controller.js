import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

export const getAllNotes = async (req, res, next) => {
  const { id } = req.doctor;
  const notes = await prisma.doctorNote.findMany({
    where: { doctorId: Number(id) },
  });
  res.json({ message: "Fetched the notes", results: notes });
};

export const createNote = async (req, res, next) => {
  const { id: doctorId } = req.doctor;
  const { note, userId } = req.body;
  const writeNote = await prisma.doctorNote.create({
    data: {
      note,
      doctorId: Number(doctorId),
      userId: Number(userId),
    },
  });

  res.json({ message: "Created note successfully", result: writeNote });
};

export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { id: doctorId } = req.doctor;

  const { note, userId } = req.body;

  const writeNote = await prisma.doctorNote.delete({
    where: { id: Number(id), doctorId: Number(doctorId) },
    data: { note, userId },
  });

  if (!id || !doctorId) {
    createError(404, "Note not found");
  }

  res.json({ message: "Updated note successfully", result: writeNote });
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const { id: doctorId } = req.doctor;

  await prisma.doctorNote.delete({
    where: { id: Number(id), doctorId: Number(doctorId) },
  });

  if (!id || !doctorId) {
    createError(404, "Note not found");
  }

  res.json({ message: "Deleted note successfully" });
};

export const getNotesToUsers = async (req, res, next) => {
  const { id } = req.params;
  const notes = await prisma.doctorNote.findMany({
    where: { userId: Number(id) },
    omit: { doctorId: true, userId: true },
  });

  if (!notes) {
    createError(404, "Notes not found");
  }

  res.json({ message: "Notes found", result: notes });
};

export const getReceivedNotesFromDoctor = async (req, res, next) => {
  const { id } = req.user;
  const notes = await prisma.doctorNote.findMany({
    where: { userId: Number(id) },
    omit: { doctorId: true, userId: true },
  });

  if (!notes) {
    createError(404, "Notes not found");
  }

  res.json({ message: "Notes found", results: notes });
};
