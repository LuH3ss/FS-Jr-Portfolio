# 🚀 AI-Enhanced Fullstack Portfolio

Plataforma integral de gestión de contenidos que utiliza **Inteligencia Artificial Generativa** para transformar ideas técnicas en publicaciones profesionales y estructuradas.

## 🎯 Objetivo
Construir una arquitectura fullstack moderna que resuelva problemas reales de redacción técnica, aplicando validación estricta de datos y procesamiento de lenguaje natural en tiempo real.

## ✨ Características Destacadas
* **AI Content Refiner:** Integración con LLMs para la mejora automática de contenido técnico.
* **Streaming de Respuesta:** Uso de ReadableStream para visualizar la generación de texto de la IA en tiempo real (UX fluida).
* **Validación con Zod:** Esquemas de seguridad en servidor y cliente para garantizar la integridad de cada post.
* **Arquitectura Desacoplada:** Frontend en Next.js y Backend en Express con manejo seguro de sesiones mediante Cookies (SameSite: Lax).

## 🛠️ Stack Tecnológico

**Frontend:**
* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Lucide React

**Backend:**
* Node.js & Express
* Prisma ORM (Gestión de base de datos)
* PostgreSQL
* Zod (Schema Validation)
* IA: Groq / OpenAI SDK

---

## 🚀 Instalación y Uso

### 1. Clonar el repositorio
git clone https://github.com/usuario/repo.git
cd repo

### 2. Configuración del Backend
cd backend
npm install

# Crear archivo .env en /backend con:
DATABASE_URL="tu_url_postgresql"
JWT_SECRET="tu_secreto_seguro"
GROQ_API_KEY="tu_api_key"
PORT=4000

# Ejecutar migraciones e iniciar:
npx prisma migrate dev
npm run dev

### 3. Configuración del Frontend
cd ../frontend
npm install
npm run dev

# Acceder a: http://localhost:3000

---

## 📝 Próximos Pasos
* [ ] Implementación de almacenamiento de imágenes (Cloudinary/S3).
* [ ] Sistema de etiquetas y categorías para los posts.
* [ ] Despliegue en producción con CI/CD.

---
*Desarrollado como proyecto Fullstack de alto rendimiento.*
