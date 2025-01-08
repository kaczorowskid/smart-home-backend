import { Type } from 'class-transformer';
import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsUUID, IsArray } from 'class-validator';
import { IsName } from 'src/common/validations/validations.decorators';

class ConnectedDevice {
  @IsUUID()
  id: string;
}

export class CreateRoomDto
  implements Omit<Prisma.RoomCreateInput, 'blinds' | 'thermometers'>
{
  @IsName()
  name: string;

  @IsEnum($Enums.RoomType)
  roomType: $Enums.RoomType;

  @IsArray()
  @Type(() => ConnectedDevice)
  blinds: ConnectedDevice[];

  @IsArray()
  @Type(() => ConnectedDevice)
  thermometers: ConnectedDevice[];
}
