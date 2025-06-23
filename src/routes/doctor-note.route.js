import express from "express";
import { doctorAuthMiddleware } from "../middlewares/doctor-auth.middleware.js";
import { createNote, deleteNote, getAllNotes, getNotesToUsers, getReceivedNotesFromDoctor, updateNote } from "../controllers/doctor-note.controller.js";
import { userAuthMiddleware } from "../middlewares/user-auth.middleware.js";

const router = express.Router();
router.get('/my-notes', doctorAuthMiddleware, getAllNotes);
router.post('/', doctorAuthMiddleware, createNote);
router.get('/received', userAuthMiddleware, getReceivedNotesFromDoctor);
router.get('/user/:id', doctorAuthMiddleware, getNotesToUsers);
router.patch('/:id', doctorAuthMiddleware, updateNote);
router.delete('/:id', doctorAuthMiddleware, deleteNote);

export default router;