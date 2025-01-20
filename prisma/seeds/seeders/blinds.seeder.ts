import { type PrismaClient } from '@prisma/client';
import { blinds } from '../data/blinds.data';

export class BlindsSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding blinds...');

    try {
      await this.prisma.blind.createMany({
        data: blinds,
        skipDuplicates: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
