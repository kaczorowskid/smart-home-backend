import { PrismaClient } from '@prisma/client';
import { temperatureData } from './temperature.data';

const prisma = new PrismaClient();

const main = async () => {
  for (let item of temperatureData) {
    await prisma.thermometer.create({
      data: {
        device_id: 'c8e16bcf-7bda-426c-bd99-4e2d3f5092f9',
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
