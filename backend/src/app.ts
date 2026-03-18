import express from "express";
import postRoutes from "./routes/routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

// Simplificado: Sin cookieParser y sin credentials: true
app.use(
  cors({
    origin: [
      "https://fs-jr-portfolio-cp3q8mtcj-luhess-projects.vercel.app", // La URL de la captura
      "https://fs-jr-portfolio.vercel.app", // Tu dominio principal de Vercel
      "http://localhost:5173", // Local
     
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]

 })
);

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use(errorMiddleware);

export default app;