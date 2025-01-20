import { RoomType, type Room } from '@prisma/client';

export const rooms: Room[] = [
  {
    name: 'Kitchen',
    roomType: RoomType.KITCHEN,
    id: '94187179-003e-42e5-b78f-054fb976a437',
  },
  {
    name: 'Batchroom',
    roomType: RoomType.BATHROOM,
    id: '8fb824e7-8771-4e25-8513-b2ef3c85c707',
  },
];
