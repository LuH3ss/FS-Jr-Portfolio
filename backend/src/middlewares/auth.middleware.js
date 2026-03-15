import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
//# sourceMappingURL=auth.middleware.js.map