import express from "express";
import postRoutes from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

// Simplificado: Sin cookieParser y sin credentials: true
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://fs-jr-portfolio.vercel.app'],
  })
);

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use(errorMiddleware);

export default app;