"use server";

import { postService } from "@/services/post.service";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { error: "Todos los campos son obligatorios" };
  }

  try {
    const res = await postService.createPost({ title, content });

    if (!res.ok) {
      return { error: "No se pudo crear el post en el servidor" };
    }

    // Esta es la clave de Next.js 14:
    // Invalida la caché del Dashboard y hace que se pida la lista de nuevo
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (e) {
    return { error: "Error de conexión" };
  }
}