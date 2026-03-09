'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postService } from '@/services/post.service';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postService.createPost({title, content})
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
          className="w-full p-2 border rounded-md" 
          placeholder="Un título llamativo..."
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Contenido</label>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-md h-32" 
          placeholder="Escribe el cuerpo de tu post aquí..."
          required
        />
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