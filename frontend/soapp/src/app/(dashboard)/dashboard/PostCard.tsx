'use client';
import { useState } from 'react';
import { postService } from "@/services/post.service";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/definitions";
import { Trash2 } from 'lucide-react';

export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  const handleUpdate = async () => {
    const res = await postService.updatePost(post.id, { 
      title: editTitle, 
      content: editContent 
    });
    
    if (res.ok) {
      setIsEditing(false);
      router.refresh(); // Refresca los datos del servidor
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Seguro que querés eliminar este post?')) return;

    try {
      // Recordá usar String(post.id) si tu API espera un string
      const res = await postService.deletePost(String(post.id));
      if (res.ok) {
        router.refresh(); // Refresca la lista de posts
      }
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  if (isEditing) {
    return (
      <div className="p-6 bg-white border-2 border-blue-500 rounded-xl shadow-md">
        <input 
          className="w-full mb-2 p-2 border rounded" 
          value={editTitle} 
          onChange={(e) => setEditTitle(e.target.value)} 
        />
        <textarea 
          className="w-full mb-2 p-2 border rounded" 
          value={editContent} 
          onChange={(e) => setEditContent(e.target.value)} 
        />
        <div className="flex gap-2">
          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Guardar</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <article className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h3>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>
      <div className="mt-4 flex gap-4 items-center">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          Editar
        </button>
        {/* Aquí iría tu botón de Eliminar que ya funciona */}
        <button 
        onClick={handleDelete}
        className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
        title="Eliminar post"
      >
        <Trash2 size={20} />
      </button>
      </div>
    </article>
  );
}