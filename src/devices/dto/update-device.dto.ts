import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { $Enums } from '@prisma/client';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  type: $Enums.DeviceType;
}
