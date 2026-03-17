import { Router } from "express";
import { login, createUsers, logout, getMe } from "../controllers/controllers";
import { asyncHandler } from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth.middleware";




const authRoutes = Router();

authRoutes.post("/login", asyncHandler(login));
authRoutes.post("/register", asyncHandler(createUsers));
authRoutes.get("/me", authMiddleware, asyncHandler(getMe));
authRoutes.post("/logout", asyncHandler(logout));



export default authRoutes;
