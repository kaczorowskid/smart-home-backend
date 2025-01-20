import { type PrismaClient } from '@prisma/client';
import { thermometers } from '../data/thermometers.data';

export class ThermometersSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding thermometers...');

    try {
      await this.prisma.thermometer.createMany({
        data: thermometers,
        skipDuplicates: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
