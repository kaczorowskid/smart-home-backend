import { PrismaClient } from '@prisma/client';
import { generateData } from './temperature.data';

const prisma = new PrismaClient();

const data = generateData();

const main = async () => {
  for (let item of data) {
    await prisma.thermometerData.create({
      data: {
        deviceId: '1',
        ...item,
      },
    });
  }
};

main()
  .catch(async (e) => {
    console.log('error ', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
