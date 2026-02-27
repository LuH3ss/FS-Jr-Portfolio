import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const authorize = (...roles: ("USER" | "ADMIN")[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.userRole) {
      throw new AppError("Unauthorized", 401);
    }

    if (!roles.includes(req.userRole)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
};