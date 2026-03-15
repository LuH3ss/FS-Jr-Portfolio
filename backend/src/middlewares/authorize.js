import { AppError } from "../utils/AppError.js";
export const authorize = (...roles) => {
    return (req, _res, next) => {
        if (!req.userRole) {
            throw new AppError("Unauthorized", 401);
        }
        if (!roles.includes(req.userRole)) {
            throw new AppError("Forbidden", 403);
        }
        next();
    };
};
//# sourceMappingURL=authorize.js.map