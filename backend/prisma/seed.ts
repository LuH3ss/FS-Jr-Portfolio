import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordAdmin = await bcrypt.hash('admin123', 10);
  const passwordJuli = await bcrypt.hash('juli123', 10);

  // Crear o actualizar usuario Juli
  await prisma.user.upsert({
    where: { email: 'juli@deleon.com' },
    update: {},
    create: {
      email: 'juli@deleon.com',
      password: passwordJuli,
      role: 'ADMIN',
    },
  });

  // Crear o actualizar usuario Admin
  await prisma.user.upsert({
    where: { email: 'admin@mail.com' },
    update: {},
    create: {
      email: 'admin@mail.com',
      password: passwordAdmin,
      role: 'ADMIN',
    },
  });

  console.log('Seeders ejecutados correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });