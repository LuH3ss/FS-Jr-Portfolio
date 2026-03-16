import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "node:console";
import { AppError } from "../utils/AppError.js";
import { postSchema } from "../utils/validations/post.shema.js";
import OpenAI from "openai";

/* =========================
   POSTS
========================= */

export const deletePost = async (req: Request, res: Response) => {
   
    const postId = req.params.id as string;

    if (!req.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
    throw new AppError("Post not found", 404);
    }

    if (
  req.userRole !== "ADMIN" &&
  post.authorId !== req.userId
) {
  throw new AppError("Not authorized", 403);
}

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.status(204).send();

 
     ;
  

};

export const updatePost = async (req: Request, res: Response) => {
 
    const postId = req.params.id as string;

    if (!req.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { title, content } = req.body;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.authorId !== req.userId) {
      throw new AppError("Not authorized", 403);
    }

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
  
  
    if (!req.userId) {
  throw new AppError("Unauthorized", 401);      
    }

    const userId = req.userId;
    const result = postSchema.safeParse(req.body);

    
    
    if (!result.success) {
      throw new AppError("Title and content are required", 400)
    }
    
    const { title, content } = result.data;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return res.status(201).json(post);

  
   
  
};

export const getPosts = async (_req: Request, res: Response) => {
 
   const posts = await prisma.post.findMany({
       include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        }}
   });
  
  return res.json(posts);
 
};

export const getPostById = async (req: Request, res: Response) => {

    const  id  = req.params.id as string

    
  const post = await prisma.post.findUnique({
  where: { id },
  include: {
    author: {
      select: {
        id: true,
        email: true,
      },
    },
  },
})
  if(!post) {
    throw new AppError("Post not found", 404)
  }
  return res.json(post)
 
}

/* =========================
   USERS
========================= */

export const getUsers = async (_req: Request, res: Response) => {
 
   const users = await prisma.user.findMany();

  

  return res.json(users);

  
 
};

export const getMe = async (req: Request, res: Response) => {
  
    if (!req.userId) {
     throw new AppError("Anauthorized", 401)
    }

    const userId = req.userId;

    const user = await prisma.user.findUnique({
    where: { id: userId! },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    return res.json(user);
};

/* =========================
   AUTH
========================= */

export const login = async (req: Request, res: Response) => {
  
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
     throw new AppError("Invalida credentials", 401)
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
       throw new AppError("Invalida credentials", 401)
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
      const isProduction = process.env.NODE_ENV === 'production';
   res.cookie("token", token, {
  httpOnly: true,
  secure: true, // Siempre true porque Render y Vercel son HTTPS
  sameSite: "none", // Obligatorio para cross-origin (Vercel <-> Render)
  maxAge: 1000 * 60 * 60 * 24, 
  path: "/"
});
return res.json({ message: "Logged in" });

};

export const logout = async (req: Request, res: Response) => {
  
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
};

export const createUsers = async (req: Request, res: Response) => {
  
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role:"USER"
      },
    });

    
    return res.status(201).json(user);
    
    
  
};

/* =========================
   AI
========================= */

// Configuración para usar Groq como si fuera OpenAI
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, 
  baseURL: "https://api.groq.com/openai/v1",
});

export const improvePost = async (req: any, res: any) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Falta el texto a mejorar" });
  }

  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b", // Modelo rápido y eficiente de Groq
      messages: [
        {
          role: "system",
          content: "Sos un editor de tecnología experto. Reescribí el texto del usuario para que sea claro, simple, amistoso y atractivo para un portfolio profesional."
        },
        { role: "user", content: prompt }
      ],
      stream: true, // Esto es lo que permite el streaming
    });

    // Preparamos al navegador para recibir datos poco a poco
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || "";
      res.write(content); // Enviamos cada pedacito al Frontend
    }

    res.end(); // Terminamos la conexión cuando termina la IA
  } catch (error) {
    console.error("Error en AI Controller:", error);
    res.status(500).json({ error: "Error al mejorar el texto" });
  }
};