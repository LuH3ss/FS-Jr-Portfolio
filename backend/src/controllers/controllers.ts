import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* =========================
   POSTS
========================= */

export const deletePost = async (req: Request<{ id: string }>, res: Response) => {
  try {

    const postIdParam = req.params.id;

if (!postIdParam || Array.isArray(postIdParam)) {
  return res.status(400).json({ message: "Invalid Post ID" });
}

    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const userId = req.userId;
    

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.json({ message: "Post deleted" });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updatePost = async (req: Request<{ id: string }>, res: Response) => {
  try {

    const postIdParam = req.params.id;

if (!postIdParam || Array.isArray(postIdParam)) {
  return res.status(400).json({ message: "Invalid Post ID" });
}

    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.userId;
    const { title, content } = req.body;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return res.json(updatedPost);

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const postPost = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.userId;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return res.status(201).json(post);

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
};

/* =========================
   USERS
========================= */

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

/* =========================
   AUTH
========================= */

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.json({ token });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const createUsers = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json(user);

  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
