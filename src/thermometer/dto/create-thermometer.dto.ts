import { IsEnum } from 'class-validator';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsName,
  IsDeviceId,
} from 'src/common/validations/validations.decorators';

export class CreateThermometerDto implements Prisma.ThermometerCreateInput {
  @IsName()
  name: string;

  @IsDeviceId()
  deviceId: string;

  @IsEnum($Enums.DeviceType)
  type: $Enums.DeviceType;
}
