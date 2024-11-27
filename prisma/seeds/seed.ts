import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const admin = await prisma.user.create({
    data: {
      name: 'Test',
      surname: 'User',
      email: 'test@user.com',
      password: '$2a$10$ZDQWHBF1k4XFuDsQa2n39OEr/eSpsJXF.8LRkDAdw/bNHAC3u6Da2', //TestPassword!234,
      isVerified: true,
      role: 'ADMIN',
    },
  });

  console.log(admin);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
