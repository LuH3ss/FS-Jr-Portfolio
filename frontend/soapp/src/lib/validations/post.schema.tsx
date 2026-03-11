import { z } from "zod";

export const postSchema = z.object({
  title: z.string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "Título demasiado largo"),
  content: z.string()
    .min(10, "El contenido debe ser más descriptivo")
    .max(2000),
});

// Esto crea el tipo automáticamente para TypeScript
export type PostInput = z.infer<typeof postSchema>;