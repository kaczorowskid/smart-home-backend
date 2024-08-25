import { Prisma } from '@prisma/client';

export class CreateThermometerDto implements Prisma.ThermometerCreateInput {
  date: string;
  device: Prisma.DeviceCreateNestedOneWithoutThermometersInput;
  humidity: number;
  temperature: number;
}
