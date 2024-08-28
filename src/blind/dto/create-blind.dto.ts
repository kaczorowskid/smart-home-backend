import { $Enums, Prisma } from '@prisma/client';

export class CreateBlindDto implements Prisma.BlindCreateInput {
  name: string;
  deviceId: string;
  type: $Enums.DeviceType;
}
