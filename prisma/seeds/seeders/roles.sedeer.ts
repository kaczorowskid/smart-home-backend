import { type PrismaClient } from '@prisma/client';
import { roles } from '../data/roles.data';

export class RolesSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding roles...');

    try {
      await this.prisma.role.createMany({
        data: roles,
        skipDuplicates: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
