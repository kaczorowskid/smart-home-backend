import { mapThermometerStatus } from './thermometer.mapper';

const ONE_MINUTE_MS = 1000 * 60;

const createThermometer = (createdAt: Date) => ({
  id: 'thermo-1',
  deviceId: '01',
  name: 'Living Room',
  type: 'THERMOMETER' as const,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  data: [
    {
      createdAt,
      battery: 95,
      id: 'data-1',
      humidity: 45.0,
      deviceId: '01',
      date: createdAt,
      temperature: 22.5,
      updatedAt: createdAt,
      thermometerId: 'thermo-1',
    },
  ],
});

describe('mapThermometerStatus', () => {
  it('should return undefined for null input', () => {
    expect(mapThermometerStatus(null)).toBeUndefined();
  });

  it('should return offline when no data exists', () => {
    const thermometer = {
      data: [],
      id: 'thermo-1',
      name: 'Sensor',
      deviceId: '01',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'THERMOMETER' as const,
    };

    const result = mapThermometerStatus(thermometer);

    expect(result).toEqual(expect.objectContaining({ status: 'offline' }));
    expect(result).not.toHaveProperty('data');
  });

  it('should return online when latest data is within 12 minutes', () => {
    const recentDate = new Date(Date.now() - ONE_MINUTE_MS * 5);
    const thermometer = createThermometer(recentDate);

    const result = mapThermometerStatus(thermometer);

    expect(result.status).toBe('online');
    expect(result).toHaveProperty('data');
  });

  it('should return offline when latest data is older than 12 minutes', () => {
    const oldDate = new Date(Date.now() - ONE_MINUTE_MS * 15);
    const thermometer = createThermometer(oldDate);

    const result = mapThermometerStatus(thermometer);

    expect(result.status).toBe('offline');
  });

  it('should return offline at exactly 12 minutes boundary', () => {
    const boundaryDate = new Date(Date.now() - ONE_MINUTE_MS * 12 - 1);
    const thermometer = createThermometer(boundaryDate);

    const result = mapThermometerStatus(thermometer);

    expect(result.status).toBe('offline');
  });
});
