import { Prisma } from '@prisma/client';

export class CreateRoomDto
  implements Omit<Prisma.RoomCreateInput, 'blinds' | 'thermometers'>
{
  image: string;
  name: string;
  blinds: {
    id: string;
  }[];
  thermometers: {
    id: string;
  }[];
}
