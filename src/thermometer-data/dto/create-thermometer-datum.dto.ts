import { Prisma } from '@prisma/client';

export class CreateThermometerDatumDto
  implements Omit<Prisma.ThermometerDataCreateInput, 'Thermometer'>
{
  temperature: number;
  humidity: number;
  date: string | Date;
  deviceId: string;
}
