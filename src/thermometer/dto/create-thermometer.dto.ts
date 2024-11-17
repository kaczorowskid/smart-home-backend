import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
import {
  IsDeviceId,
  IsName,
} from 'src/common/validations/validations.decorators';

export class CreateThermometerDto implements Prisma.ThermometerCreateInput {
  @IsName()
  name: string;

  @IsDeviceId()
  deviceId: string;

  @IsEnum($Enums.DeviceType)
  type: $Enums.DeviceType;
}
