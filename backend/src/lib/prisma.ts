import 'dotenv/config';
  // import { PrismaClient, Prisma } from '@prisma/client';
  import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient, Prisma } = require('@prisma/client');
import { PrismaPg } from '@prisma/adapter-pg';

// Crear el adapter con tu DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Crear la instancia de PrismaClient pasando el adapter
const prisma = new PrismaClient({ adapter });

// Exportar correctamente
export default prisma;
