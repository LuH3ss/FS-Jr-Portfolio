// src/services/post.service.ts
import { apiFetch } from "@/lib/api";
import { Post } from "@/lib/definitions";


// NO IMPORTES postService AQUÍ. Solo defínelo y expórtalo.
export const postService = {
  getAll: async (): Promise<Post[]> => {
    const res = await apiFetch("/posts");
    if (!res.ok) return [];
    return res.json();
  },

 
  
  // Aquí puedes agregar delete, update, etc.


  createPost: async (data: {title: string, content: string}) => {
   return apiFetch("/posts", {
      method: "POST",
      body: JSON.stringify(data),
   })
    },
  
  deletePost: async (id:string | number) => {
      return apiFetch(`/posts/${id}`, {
        method: "DELETE", 

      })
  },

  updatePost: async (id: string | number, data: { title?: string; content?: string }) => {
  return apiFetch(`/posts/${id}`, {
    method: "PUT", // O "PUT" según como lo tengas en Express
    body: JSON.stringify(data),
  });
},
};