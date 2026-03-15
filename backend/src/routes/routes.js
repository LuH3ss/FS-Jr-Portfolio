import { Router } from "express";
import { postPost, updatePost, deletePost, getPosts, getPostById, getUsers, improvePost } from "../controllers/controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorize } from "../middlewares/authorize.js";
const router = Router();
router.post("/", authMiddleware, asyncHandler(postPost));
router.post("/improve", asyncHandler(improvePost));
router.put("/:id", authMiddleware, asyncHandler(updatePost));
router.delete("/:id", authMiddleware, asyncHandler(deletePost));
router.get("/users", authMiddleware, authorize("ADMIN"), asyncHandler(getUsers));
router.get("/", asyncHandler(getPosts));
router.get("/:id", asyncHandler(getPostById));
export default router;
//# sourceMappingURL=routes.js.map