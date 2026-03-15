import { AppError } from "../utils/AppError.js";
import { Prisma } from "../generated/prisma/client.js";
export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002") {
        return res.status(409).json({
            error: "Email already exists",
        });
    }
    console.error(err);
    return res.status(500).json({
        error: "Internal Server Error",
    });
};
//# sourceMappingURL=errorMiddleware.js.map