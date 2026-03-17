import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import { postSchema } from "../utils/validations/post.shema.js";
import OpenAI from "openai";

/* =========================
    POSTS
========================= */

export const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id;

    if (!req.userId) throw new AppError("Unauthorized", 401);

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) throw new AppError("Post not found", 404);

    // Verificación de Dueño o Admin
    if (req.userRole !== "ADMIN" && post.authorId !== req.userId) {
        throw new AppError("Not authorized", 403);
    }

    await prisma.post.delete({ where: { id: postId } });
    return res.status(204).send();
};

export const updatePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    if (!req.userId) throw new AppError("Unauthorized", 401);

    const { title, content } = req.body;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) throw new AppError("Post not found", 404);
    if (post.authorId !== req.userId) throw new AppError("Not authorized", 403);

    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
            ...(title && { title }),
            ...(content && { content }),
        },
    });

    return res.json(updatedPost);
};

export const postPost = async (req: Request, res: Response) => {
    if (!req.userId) throw new AppError("Unauthorized", 401);

    const result = postSchema.safeParse(req.body);
    if (!result.success) throw new AppError("Title and content are required", 400);
    
    const { title, content } = result.data;

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: req.userId,
        },
    });

    return res.status(201).json(post);
};

export const getPosts = async (_req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
        include: {
            author: { select: { id: true, email: true } },
        }
    });
    return res.json(posts);
};

/* =========================
    AUTH (Corregido para LocalStorage)
========================= */

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );

    // IMPORTANTE: No usamos cookies, devolvemos el token en el JSON
    return res.json({ 
        message: "Logged in", 
        token, 
        user: { id: user.id, email: user.email, role: user.role } 
    });
};

export const logout = async (_req: Request, res: Response) => {
    // En LocalStorage el logout se hace en el Frontend borrando el token
    return res.json({ message: "Logged out" });
};

export const createUsers = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new AppError("Email and password are required", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, role: "USER" },
    });

    return res.status(201).json(user);
};

/* =========================
    AI (Groq)
========================= */

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const improvePost = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Falta el texto" });

    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                { role: "system", content: "Sos un editor de tecnología experto." },
                { role: "user", content: prompt }
            ],
            stream: true,
        });

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            res.write(content);
        }
        res.end();
    } catch (error) {
        res.status(500).json({ error: "Error al mejorar el texto" });
    }
};