import { $Enums, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { IsName } from 'src/common/validations/validations.decorators';

class ConnectedDevice {
  @IsUUID()
  id: string;
}

export class CreateRoomDto
  implements Omit<Prisma.RoomCreateInput, 'blinds' | 'thermometers'>
{
  @IsEnum($Enums.RoomType)
  roomType: $Enums.RoomType;

  @IsName()
  name: string;

  @IsArray()
  @Type(() => ConnectedDevice)
  blinds: ConnectedDevice[];

  @IsArray()
  @Type(() => ConnectedDevice)
  thermometers: ConnectedDevice[];
}
