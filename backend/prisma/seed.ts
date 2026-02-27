import prisma from '../src/lib/prisma.js'
import bcrypt from 'bcrypt'



async function main () {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@mail.com' }
  })
  if (existingAdmin) {
    console.log('Admin already exists')
    return
  }
  await prisma.user.create({
    data: { email: 'admin@mail.com', password: hashedPassword, role: 'ADMIN' }
  })
  console.log('Admin created successfully')
}
main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
