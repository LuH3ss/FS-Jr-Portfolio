'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postService } from '@/services/post.service';
import { postSchema } from '@/lib/validations/post.schema';
import { Sparkles } from "lucide-react"; // Instalamos lucide-react antes
import { aiService } from "@/services/ai.services";



export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  // Esto asegura que el componente se "monte" en el cliente antes de mostrar cambios raros
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // O un esqueleto de carga simple

  const handleImproveWithAI = async () => {
  if (!content || content.length < 5) return alert("Escribí una idea breve primero");
  
  setIsGenerating(true);
  try {
    const stream = await aiService.improveContent(content);
    const reader = stream?.getReader();
    const decoder = new TextDecoder();
    
    let fullText = "";
    setContent(""); // Limpiamos para que la IA "escriba" de cero

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      fullText += chunk;
      setContent((prev) => prev + chunk); // Actualiza el textarea en tiempo real
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsGenerating(false);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
  // 1. Validamos los datos con Zod
  const result = postSchema.safeParse({ title, content });

  if (!result.success) {
    // Si hay error, Zod nos dice exactamente qué falló
    const errorMessage = result.error.issues[0].message;
    alert(errorMessage); 
    return;
  }

  // 2. Si pasó la validación, seguimos con el envío
  setLoading(true);


    try {
      const res = await postService.createPost(result.data)
      if(res.ok){ 
        setTitle('');
        setContent('');
        router.refresh()
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Título</label>
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-900 placeholder:text-gray-400" 
          placeholder="Un título llamativo..."
          required
        />

      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Contenido</label>
      
  <textarea 
    value={content} 
    onChange={(e) => setContent(e.target.value)}
    className="w-full p-2 border rounded-md h-32 text-gray-900 placeholder:text-gray-400"
    placeholder="Tu idea técnica aquí..."
  />
        <div className="relative">
  <button
    type="button"
    onClick={handleImproveWithAI}
    disabled={isGenerating}
    className="absolute bottom-2 right-2 flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700 disabled:opacity-50"
  >
    {isGenerating ? "Mejorando..." : <><Sparkles size={16} /> Mejorar con IA</>}
  </button>
</div>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {loading ? 'Publicando...' : 'Publicar Post'}
      </button>
    </form>
  );
}