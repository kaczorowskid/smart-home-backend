import { mapValuesFromDevice } from './thermometer-data.mapper';

describe('mapValuesFromDevice', () => {
  it('should round temperature and humidity to 1 decimal place', () => {
    const input = {
      battery: 95,
      deviceId: '01',
      humidity: 45.678,
      temperature: 22.345,
      date: new Date('2025-01-01'),
    };

    const result = mapValuesFromDevice(input);

    expect(result.humidity).toBe(45.7);
    expect(result.temperature).toBe(22.3);
  });

  it('should preserve other fields unchanged', () => {
    const date = new Date('2025-01-01');
    const input = {
      date,
      battery: 100,
      deviceId: '02',
      humidity: 50.0,
      temperature: 20.0,
    };

    const result = mapValuesFromDevice(input);

    expect(result.battery).toBe(100);
    expect(result.deviceId).toBe('02');
    expect(result.date).toBe(date);
  });

  it('should handle values that are already rounded', () => {
    const input = {
      battery: 80,
      deviceId: '01',
      humidity: 45.0,
      date: new Date(),
      temperature: 22.5,
    };

    const result = mapValuesFromDevice(input);

    expect(result.humidity).toBe(45.0);
    expect(result.temperature).toBe(22.5);
  });
});
