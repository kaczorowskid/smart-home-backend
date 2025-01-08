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
  @IsBattery()
  battery: number;

  @IsHumidity()
  humidity: number;

  @IsDeviceId()
  deviceId: string;

  @IsDateString()
  date: Date | string;

  @IsTemperature()
  temperature: number;
}
