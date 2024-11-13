import { $Enums, Prisma } from '@prisma/client';

export class CreateRoomDto
  implements Omit<Prisma.RoomCreateInput, 'blinds' | 'thermometers'>
{
  roomType: $Enums.RoomType;
  name: string;
  blinds: {
    id: string;
  }[];
  thermometers: {
    id: string;
  }[];
}
