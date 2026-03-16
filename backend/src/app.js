import express from "express";
import postRoutes from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
const app = express();
app.use(express.json());
app.use(cors({
   origin: 'https://tu-dominio-de-vercel.app', // O '*' para probar rápido
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map