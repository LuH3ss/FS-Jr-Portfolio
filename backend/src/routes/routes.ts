import { Router } from "express";
import { postPost, updatePost, deletePost, getPosts, getPostById, getUsers } from "../controllers/controllers.js";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/", authMiddleware, asyncHandler(postPost));
router.put("/:id", authMiddleware, asyncHandler(updatePost));
router.delete("/:id", authMiddleware, asyncHandler(deletePost));
router.get(
  "/users",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(getUsers)
);
router.get("/", asyncHandler(getPosts));
router.get("/:id", asyncHandler(getPostById));



export default router;
