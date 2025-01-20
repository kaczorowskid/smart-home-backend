import { type PrismaClient } from '@prisma/client';
import { thermometerData } from '../data/thermometer-data.data';

export class ThermometerDataSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding thermometer data...');

    try {
      await this.prisma.thermometerData.createMany({
        skipDuplicates: true,
        data: thermometerData,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
