    import express from "express";
    import postRoutes from "./routes/routes.js";
    import { errorMiddleware } from "./middlewares/errorMiddleware.js";

    const app = express();

    app.use(express.json());

    app.use("/posts", postRoutes);

    app.use(errorMiddleware)

    export default app;
