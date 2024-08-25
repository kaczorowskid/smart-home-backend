import { $Enums, Prisma } from '@prisma/client';

export class CreateDeviceDto implements Prisma.DeviceCreateInput {
  name: string;
  device_id: string;
  type?: $Enums.DeviceType;
}
