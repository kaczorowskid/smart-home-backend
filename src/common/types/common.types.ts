import { type $Enums, type ThermometerData } from '@prisma/client';

export type ThermometerWithData = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deviceId: string;
  type: $Enums.DeviceType;
  data?: ThermometerData[];
  status: 'online' | 'offline';
};
