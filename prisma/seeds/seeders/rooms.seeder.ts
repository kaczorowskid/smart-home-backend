import { type PrismaClient } from '@prisma/client';
import { rooms } from '../data/rooms.data';

export class RoomsSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding rooms...');

    try {
      await this.prisma.room.createMany({
        data: rooms,
        skipDuplicates: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
