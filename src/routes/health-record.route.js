import express from "express";
import { userAuthMiddleware } from "../middlewares/user-auth.middleware.js";
import { createRecord, deleteRecord, getAllRecords, getMyRecord, updateRecord } from "../controllers/health-record.controller.js";

const router = express.Router();
router.get('/', userAuthMiddleware, getAllRecords);
router.post('/', userAuthMiddleware, createRecord);
router.get('/:id', userAuthMiddleware, getMyRecord);
router.patch('/:id', userAuthMiddleware, updateRecord);
router.delete('/:id', userAuthMiddleware, deleteRecord);

export default router;