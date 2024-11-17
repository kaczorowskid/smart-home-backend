import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class DeleteDeviceDto {
  @IsEnum($Enums.DeviceType)
  type: $Enums.DeviceType;
}
