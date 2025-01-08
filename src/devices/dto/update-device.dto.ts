import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @IsEnum($Enums.DeviceType)
  type: $Enums.DeviceType;
}
