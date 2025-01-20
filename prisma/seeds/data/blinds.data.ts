import { type Blind, DeviceType } from '@prisma/client';

export const blinds: Blind[] = [
  {
    value: 0,
    deviceId: '11',
    name: 'Test Blind1',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: DeviceType.BLIND,
    id: '2272f1bf-4793-43eb-8e2a-0a50212464ee',
  },
  {
    value: 25,
    deviceId: '22',
    name: 'Test Blind2',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: DeviceType.BLIND,
    id: '8fa8a380-e91b-481e-ae23-5d287f7e240d',
  },
];
