import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import doctorRouter from "./routes/doctor.route.js"
import healthRecordRouter from "./routes/health-record.route.js"
import doctorNoteRouter from "./routes/doctor-note.route.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/doctors', doctorRouter);
app.use('/health-records', healthRecordRouter);
app.use('/doctor-notes', doctorNoteRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})