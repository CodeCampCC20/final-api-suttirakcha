import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const doctorAuthMiddleware = (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      createError(401, "Unauthorized");
    }

    const token = headers?.split(" ")[1];

    jwt.verify(token, process.env.DOCTOR_SECRET, (error, decode) => {
      if (error) {
        createError(401, "Invalid token");
      }
      req.doctor = decode;
      next();
    });
  } catch (err) {
    next(err);
  }
};
