import { type PrismaClient } from '@prisma/client';
import { rolePermissions } from '../data/permissions.data';

export class PermissionsSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding permissions...');

    try {
      await this.prisma.rolePermissionLink.createMany({
        skipDuplicates: true,
        data: rolePermissions,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
