import { $Enums, Prisma } from '@prisma/client';

export class CreateThermometerDto implements Prisma.ThermometerCreateInput {
  name: string;
  deviceId: string;
  type: $Enums.DeviceType;
}