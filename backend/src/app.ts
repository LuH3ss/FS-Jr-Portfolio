    import express from "express";
    import postRoutes from "./routes/routes.js";
    import { errorMiddleware } from "./middlewares/errorMiddleware.js";
    import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
    
    const app = express();

    app.use(express.json());

    const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL ];
    
app.use(
  cors({
   origin: [
    'http://localhost:3000', 
    'https://fs-jr-portfolio.vercel.app'],
    credentials: true,
  })
);

app.use(cookieParser());


    
  app.use("/auth", authRoutes);

    app.use("/posts", postRoutes);

    app.use(errorMiddleware);

    export default app;
