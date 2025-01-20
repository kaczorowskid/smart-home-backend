import { type PrismaClient } from '@prisma/client';
import { users } from '../data/users.data';

export class UsersSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding users...');

    try {
      await this.prisma.user.createMany({
        data: users,
        skipDuplicates: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
