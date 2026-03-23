import { endOfDay, startOfDay } from 'date-fns';
import { Test, type TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import * as mapper from './thermometer-data.mapper';
import { ThermometerDataService } from './thermometer-data.service';

const mockDatabaseService = {
  thermometerData: {
    create: jest.fn(),
    findMany: jest.fn(),
    aggregate: jest.fn(),
  },
};

const mockMinMax = {
  _min: { humidity: 40.0, temperature: 20.0 },
  _max: { humidity: 55.0, temperature: 25.0 },
};

describe('ThermometerDataService', () => {
  let service: ThermometerDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThermometerDataService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<ThermometerDataService>(ThermometerDataService);
    jest.clearAllMocks();
  });

  describe('createThermometerDatum', () => {
    it('should create datum with mapped values', async () => {
      const dto = {
        battery: 95,
        deviceId: '01',
        humidity: 45.678,
        date: new Date(),
        temperature: 22.345,
      };
      const mapped = { ...dto, humidity: 45.7, temperature: 22.3 };
      jest.spyOn(mapper, 'mapValuesFromDevice').mockReturnValue(mapped);
      mockDatabaseService.thermometerData.create.mockResolvedValue({
        id: 'data-1',
        ...mapped,
      });

      const result = await service.createThermometerDatum(dto);

      expect(mapper.mapValuesFromDevice).toHaveBeenCalledWith(dto);
      expect(mockDatabaseService.thermometerData.create).toHaveBeenCalledWith({
        data: mapped,
      });
      expect(result.humidity).toBe(45.7);
    });
  });

  describe('getMinMaxSensorValue', () => {
    it('should aggregate min/max values for today', async () => {
      mockDatabaseService.thermometerData.aggregate.mockResolvedValue(
        mockMinMax,
      );

      const result = await service.getMinMaxSensorValue('thermo-1');

      expect(result).toEqual(mockMinMax);
      expect(
        mockDatabaseService.thermometerData.aggregate,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          _min: { humidity: true, temperature: true },
          _max: { humidity: true, temperature: true },
          where: expect.objectContaining({
            Thermometer: { id: 'thermo-1' },
          }),
        }),
      );
    });

    it('should filter by current day boundaries', async () => {
      mockDatabaseService.thermometerData.aggregate.mockResolvedValue(
        mockMinMax,
      );

      await service.getMinMaxSensorValue('thermo-1');

      const callArgs =
        mockDatabaseService.thermometerData.aggregate.mock.calls[0][0];
      const now = new Date();

      expect(callArgs.where.createdAt.gte).toEqual(startOfDay(now));
      expect(callArgs.where.createdAt.lte).toEqual(endOfDay(now));
    });
  });

  describe('getOneThermometerDataLogs', () => {
    it('should return data logs with min/max values', async () => {
      const mockData = [
        { id: 'data-1', humidity: 45.0, temperature: 22.5 },
        { id: 'data-2', humidity: 43.0, temperature: 21.0 },
      ];
      mockDatabaseService.thermometerData.findMany.mockResolvedValue(mockData);
      mockDatabaseService.thermometerData.aggregate.mockResolvedValue(
        mockMinMax,
      );

      const result = await service.getOneThermometerDataLogs('thermo-1');

      expect(result).toEqual({
        data: mockData,
        min: mockMinMax._min,
        max: mockMinMax._max,
      });
    });

    it('should query data ordered by createdAt desc', async () => {
      mockDatabaseService.thermometerData.findMany.mockResolvedValue([]);
      mockDatabaseService.thermometerData.aggregate.mockResolvedValue(
        mockMinMax,
      );

      await service.getOneThermometerDataLogs('thermo-1');

      expect(mockDatabaseService.thermometerData.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
          where: expect.objectContaining({
            Thermometer: { id: 'thermo-1' },
          }),
        }),
      );
    });
  });
});
