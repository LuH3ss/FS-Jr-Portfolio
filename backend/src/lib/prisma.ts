import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

// Crear el adapter con tu DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Crear la instancia de PrismaClient pasando el adapter
const prisma = new PrismaClient({ adapter });

// Exportar correctamente
export default prisma;
