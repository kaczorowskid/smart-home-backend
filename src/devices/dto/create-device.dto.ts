import { IntersectionType } from '@nestjs/mapped-types';
import { CreateBlindDto } from 'src/blind/dto/create-blind.dto';
import { CreateThermometerDto } from 'src/thermometer/dto/create-thermometer.dto';

export class CreateDeviceDto extends IntersectionType(
  CreateThermometerDto,
  CreateBlindDto,
) {}
