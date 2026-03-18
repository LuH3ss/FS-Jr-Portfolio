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
    "https://fs-jr-portfolio-cp3q8mtcj-luhess-projects.vercel.app", 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
  })
);

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use(errorMiddleware);

export default app;