import { Prisma } from '@prisma/client';
import { IsDateString } from 'class-validator';
import {
  IsBattery,
  IsDeviceId,
  IsHumidity,
  IsTemperature,
} from 'src/common/validations/validations.decorators';

export class CreateThermometerDatumDto
  implements Omit<Prisma.ThermometerDataCreateInput, 'Thermometer'>
{
  @IsTemperature()
  temperature: number;

  @IsHumidity()
  humidity: number;

  @IsDateString()
  date: string | Date;

  @IsDeviceId()
  deviceId: string;

  @IsBattery()
  battery: number;
}
