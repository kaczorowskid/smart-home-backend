import { Test, type TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { ThermometerDataService } from 'src/thermometer-data/thermometer-data.service';
import * as mapper from './thermometer.mapper';
import { ThermometerService } from './thermometer.service';

const mockThermometer = {
  id: 'thermo-1',
  deviceId: '01',
  name: 'Living Room',
  type: 'THERMOMETER',
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  data: [
    {
      battery: 95,
      id: 'data-1',
      humidity: 45.0,
      deviceId: '01',
      date: new Date(),
      temperature: 22.5,
      createdAt: new Date(),
    },
  ],
};

const mockMinMax = {
  _min: { humidity: 40.0, temperature: 20.0 },
  _max: { humidity: 55.0, temperature: 25.0 },
};

const mockDatabaseService = {
  thermometer: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

const mockThermometerDataService = {
  getMinMaxSensorValue: jest.fn(),
};

describe('ThermometerService', () => {
  let service: ThermometerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThermometerService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        {
          provide: ThermometerDataService,
          useValue: mockThermometerDataService,
        },
      ],
    }).compile();

    service = module.get<ThermometerService>(ThermometerService);
    jest.clearAllMocks();
  });

  describe('createThermometer', () => {
    it('should create a thermometer', async () => {
      const dto = {
        deviceId: '02',
        name: 'Bedroom',
        type: 'THERMOMETER' as const,
      };
      mockDatabaseService.thermometer.create.mockResolvedValue({
        id: 'thermo-2',
        ...dto,
      });

      const result = await service.createThermometer(dto);

      expect(result).toEqual({ id: 'thermo-2', ...dto });
      expect(mockDatabaseService.thermometer.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('deleteThermometer', () => {
    it('should delete a thermometer by id', async () => {
      mockDatabaseService.thermometer.delete.mockResolvedValue(mockThermometer);

      const result = await service.deleteThermometer('thermo-1');

      expect(result).toEqual(mockThermometer);
      expect(mockDatabaseService.thermometer.delete).toHaveBeenCalledWith({
        where: { id: 'thermo-1' },
      });
    });
  });

  describe('updateThermometer', () => {
    it('should update a thermometer', async () => {
      const dto = { name: 'Updated Name' };
      mockDatabaseService.thermometer.update.mockResolvedValue({
        ...mockThermometer,
        ...dto,
      });

      const result = await service.updateThermometer('thermo-1', dto);

      expect(result.name).toBe('Updated Name');
      expect(mockDatabaseService.thermometer.update).toHaveBeenCalledWith({
        data: dto,
        where: { id: 'thermo-1' },
      });
    });
  });

  describe('getAllThermometers', () => {
    it('should return all thermometers with mapped status', async () => {
      mockDatabaseService.thermometer.findMany.mockResolvedValue([
        mockThermometer,
      ]);
      const mapSpy = jest
        .spyOn(mapper, 'mapThermometerStatus')
        .mockReturnValue({ ...mockThermometer, status: 'online' } as any);

      const result = await service.getAllThermometers();

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('online');
      expect(mapSpy).toHaveBeenCalledWith(mockThermometer);
    });
  });

  describe('getOneThermometer', () => {
    it('should return thermometer with status and min/max values', async () => {
      mockDatabaseService.thermometer.findUnique.mockResolvedValue(
        mockThermometer,
      );
      mockThermometerDataService.getMinMaxSensorValue.mockResolvedValue(
        mockMinMax,
      );
      jest
        .spyOn(mapper, 'mapThermometerStatus')
        .mockReturnValue({ ...mockThermometer, status: 'online' } as any);

      const result = await service.getOneThermometer('thermo-1');

      expect(result).toEqual(
        expect.objectContaining({
          status: 'online',
          min: mockMinMax._min,
          max: mockMinMax._max,
        }),
      );
    });

    it('should return null when thermometer is not found', async () => {
      mockDatabaseService.thermometer.findUnique.mockResolvedValue(null);
      mockThermometerDataService.getMinMaxSensorValue.mockResolvedValue(
        mockMinMax,
      );

      const result = await service.getOneThermometer('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('getDataForGraph', () => {
    it('should query data with date range filter', async () => {
      const dateFrom = new Date('2025-01-01');
      const dateTo = new Date('2025-01-31');
      const graphData = {
        name: 'Living Room',
        data: [{ humidity: 45, temperature: 22, date: new Date() }],
      };
      mockDatabaseService.thermometer.findUnique.mockResolvedValue(graphData);

      const result = await service.getDataForGraph(
        'thermo-1',
        dateFrom,
        dateTo,
      );

      expect(result).toEqual(graphData);
      expect(mockDatabaseService.thermometer.findUnique).toHaveBeenCalledWith({
        where: { id: 'thermo-1' },
        select: {
          name: true,
          data: expect.objectContaining({
            where: {
              date: { lte: dateTo, gte: dateFrom },
            },
          }),
        },
      });
    });
  });
});
