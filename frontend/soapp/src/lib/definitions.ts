// src/lib/definitions.ts

export type Role = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthResponse {
  message: string;
  user: User;
}

// También podemos definir cómo se ve un Post, ya que lo usarás luego
export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
}