import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const doctorAuthMiddleware = (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      createError(401, "Unauthorized");
    }

    const token = headers?.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        createError(401, "Unauthorized");
      }
      req.doctor = decode;
      next();
    });
  } catch (err) {
    next(err);
  }
};
