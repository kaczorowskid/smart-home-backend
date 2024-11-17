import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
import {
  IsDeviceId,
  IsName,
} from 'src/common/validations/validations.decorators';

export class CreateBlindDto implements Prisma.BlindCreateInput {
  @IsName()
  name: string;

  @IsDeviceId()
  deviceId: string;

  @IsEnum($Enums.DeviceType)
  type: $Enums.DeviceType;
}
