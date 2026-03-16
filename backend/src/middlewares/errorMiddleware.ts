import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
// import { PrismaClient, Prisma } from '@prisma/client';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient, Prisma } = require('@prisma/client');

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  if (
  err instanceof Prisma.PrismaClientKnownRequestError &&
  (err as any)?.code === "P2002"
) {
  return res.status(409).json({
    error: "Email already exists",
  });
}

  console.error(err);

  return res.status(500).json({
    error: "Internal Server Error",
  });
};
