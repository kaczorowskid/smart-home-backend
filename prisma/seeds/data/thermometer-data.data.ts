import { v4 as uuidv4 } from 'uuid';
import { type ThermometerData } from '@prisma/client';
import { getRandomInt } from '../utils/random-number.util';
import { generateISODate } from '../utils/generate-date.util';

const generatedIsoDate = generateISODate(144);

export const thermometerData: ThermometerData[] = Array(144)
  .fill(null)
  .map((_, index) => ({
    id: uuidv4(),
    deviceId: '1',
    battery: getRandomInt(20, 70),
    humidity: getRandomInt(20, 70),
    temperature: getRandomInt(20, 30),
    date: new Date(generatedIsoDate[index]),
    createdAt: new Date(generatedIsoDate[index]),
    updatedAt: new Date(generatedIsoDate[index]),
  }));
