import { PrismaClient } from '@prisma/client';
import { PermissionType } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.$transaction(async (transaction) => {
      const role = await transaction.role.create({
        data: {
          name: 'ADMIN',
          id: '7ea0d03c-74d6-4d52-afd6-e314a5931554',
          permissions: {
            create: {
              permission: PermissionType.IS_ADMIN,
              id: 'b63a6f88-c690-454c-b4df-b48c01c833a9',
            },
          },
        },
      });

      await transaction.user.create({
        data: {
          name: 'Super',
          roleId: role.id,
          surname: 'Admin',
          isVerified: true,
          email: 'super@admin.com',
          id: 'b60211e0-71cf-43b0-b62b-fb0fb7aa4f6a',
          password:
            '$2a$10$ZDQWHBF1k4XFuDsQa2n39OEr/eSpsJXF.8LRkDAdw/bNHAC3u6Da2', // TestPassword!234,
        },
      });
    });

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Transaction failed:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
