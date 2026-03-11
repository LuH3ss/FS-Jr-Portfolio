// src/app/(dashboard)/dashboard/page.tsx
import { authService } from "@/services/auth.service";
import { postService } from "@/services/post.service";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/forms/createPostForm";
import PostCard from "./PostCard"; 

export default async function DashboardPage() {
  const user = await authService.getMe();
  
  if (!user) {
    redirect("/login");
  }

  const posts = await postService.getAll();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-950">
          Bienvenido, {user.email.split('@')[0]}
        </h1>
        <p className="text-black-500">Gestiona tus publicaciones desde aquí.</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Nueva Publicación</h2>
        <CreatePostForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Tus Posts</h2>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed rounded-lg">
              <p className="text-black-400">Aún no has escrito nada.</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} /> // Usamos el componente de cliente
            ))
          )}
        </div>
      </section>
    </div>
  );
}