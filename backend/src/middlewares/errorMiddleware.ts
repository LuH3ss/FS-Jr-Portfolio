import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { Prisma } from '@prisma/client';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Errores personalizados de tu App
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // 2. Errores conocidos de Prisma (Base de datos)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({ 
        message: 'El recurso ya existe (Violación de campo único).' 
      });
    }
  }

  // 3. Log del error para debuggear en la consola de Render
  console.error("LOG DE ERROR:", err);

  // 4. Error genérico si nada de lo anterior atrapó el problema
  return res.status(500).json({
    error: "Internal Server Error",
    details: err.message
  });
};