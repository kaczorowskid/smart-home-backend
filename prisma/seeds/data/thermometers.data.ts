import { DeviceType, type Thermometer } from '@prisma/client';

export const thermometers: Thermometer[] = [
  {
    deviceId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Test Thermometer1',
    type: DeviceType.THERMOMETER,
    id: '9d55e59e-54c4-4ef8-9039-c1d25420f9fb',
  },
  {
    deviceId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Test Thermometer2',
    type: DeviceType.THERMOMETER,
    id: 'c81195d8-257a-4adf-b0d0-b07e888b2563',
  },
];
