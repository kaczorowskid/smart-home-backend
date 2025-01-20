import { PrismaClient } from '@prisma/client';
import { UsersSeeder } from './seeders/users.seeder';
import { RoomsSeeder } from './seeders/rooms.seeder';
import { RolesSeeder } from './seeders/roles.sedeer';
import { BlindsSeeder } from './seeders/blinds.seeder';
import { PermissionsSeeder } from './seeders/permissions.seeder';
import { ThermometersSeeder } from './seeders/thermometers.seeder';
import { ThermometerDataSeeder } from './seeders/thermometer-data.seeder';

const prismClient = new PrismaClient();

const seeders = [
  new RolesSeeder(prismClient),
  new PermissionsSeeder(prismClient),
  new ThermometersSeeder(prismClient),
  new BlindsSeeder(prismClient),
  new UsersSeeder(prismClient),
  new RoomsSeeder(prismClient),
  new ThermometerDataSeeder(prismClient),
];

const main = async () => {
  for (const seeder of seeders) {
    await seeder.seed();
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismClient.$disconnect();
  });
