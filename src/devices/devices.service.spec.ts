import { BlindService } from 'src/blind/blind.service';
import { Test, type TestingModule } from '@nestjs/testing';
import { ThermometerService } from 'src/thermometer/thermometer.service';
import { DevicesService } from './devices.service';

const mockThermometer = {
  id: 'thermo-1',
  type: 'THERMOMETER',
  name: 'Living Room Sensor',
  createdAt: new Date('2025-01-02'),
};

const mockBlind = {
  id: 'blind-1',
  type: 'BLIND',
  name: 'Kitchen Blind',
  createdAt: new Date('2025-01-01'),
};

const mockThermometerService = {
  getDataForGraph: jest.fn(),
  createThermometer: jest.fn(),
  deleteThermometer: jest.fn(),
  getOneThermometer: jest.fn(),
  updateThermometer: jest.fn(),
  getAllThermometers: jest.fn(),
};

const mockBlindService = {
  createBlind: jest.fn(),
  deleteBlind: jest.fn(),
  getOneBlind: jest.fn(),
  updateBlind: jest.fn(),
  getAllBlinds: jest.fn(),
};

describe('DevicesService', () => {
  let service: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        { provide: ThermometerService, useValue: mockThermometerService },
        { provide: BlindService, useValue: mockBlindService },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    jest.clearAllMocks();
  });

  describe('getAllBlinds', () => {
    it('should delegate to blindService', async () => {
      mockBlindService.getAllBlinds.mockResolvedValue([mockBlind]);

      const result = await service.getAllBlinds();

      expect(result).toEqual([mockBlind]);
    });
  });

  describe('getAllThermometers', () => {
    it('should delegate to thermometerService', async () => {
      mockThermometerService.getAllThermometers.mockResolvedValue([
        mockThermometer,
      ]);

      const result = await service.getAllThermometers();

      expect(result).toEqual([mockThermometer]);
    });
  });

  describe('getDataForGraph', () => {
    it('should delegate to thermometerService with date range', async () => {
      const dateFrom = new Date('2025-01-01');
      const dateTo = new Date('2025-01-31');
      const graphData = { data: [], name: 'Sensor' };
      mockThermometerService.getDataForGraph.mockResolvedValue(graphData);

      const result = await service.getDataForGraph(
        'thermo-1',
        dateFrom,
        dateTo,
      );

      expect(result).toEqual(graphData);
      expect(mockThermometerService.getDataForGraph).toHaveBeenCalledWith(
        'thermo-1',
        dateFrom,
        dateTo,
      );
    });
  });

  describe('getOneDevice', () => {
    it('should return thermometer when found', async () => {
      mockThermometerService.getOneThermometer.mockResolvedValue(
        mockThermometer,
      );
      mockBlindService.getOneBlind.mockResolvedValue(null);

      const result = await service.getOneDevice('thermo-1');

      expect(result).toEqual(mockThermometer);
    });

    it('should return blind when thermometer not found', async () => {
      mockThermometerService.getOneThermometer.mockResolvedValue(null);
      mockBlindService.getOneBlind.mockResolvedValue(mockBlind);

      const result = await service.getOneDevice('blind-1');

      expect(result).toEqual(mockBlind);
    });

    it('should return null when neither found', async () => {
      mockThermometerService.getOneThermometer.mockResolvedValue(null);
      mockBlindService.getOneBlind.mockResolvedValue(null);

      const result = await service.getOneDevice('unknown');

      expect(result).toBeNull();
    });
  });

  describe('deleteDevice', () => {
    it('should delete blind when type is BLIND', async () => {
      mockBlindService.deleteBlind.mockResolvedValue(mockBlind);

      const result = await service.deleteDevice('blind-1', { type: 'BLIND' });

      expect(mockBlindService.deleteBlind).toHaveBeenCalledWith('blind-1');
      expect(result).toEqual(mockBlind);
    });

    it('should delete thermometer when type is THERMOMETER', async () => {
      mockThermometerService.deleteThermometer.mockResolvedValue(
        mockThermometer,
      );

      const result = await service.deleteDevice('thermo-1', {
        type: 'THERMOMETER',
      });

      expect(mockThermometerService.deleteThermometer).toHaveBeenCalledWith(
        'thermo-1',
      );
      expect(result).toEqual(mockThermometer);
    });
  });

  describe('createDevice', () => {
    it('should create blind when type is BLIND', async () => {
      const dto = { deviceId: '03', name: 'New Blind', type: 'BLIND' as const };
      mockBlindService.createBlind.mockResolvedValue({ id: 'blind-2', ...dto });

      const result = await service.createDevice(dto);

      expect(mockBlindService.createBlind).toHaveBeenCalledWith(dto);
      expect(result.id).toBe('blind-2');
    });

    it('should create thermometer when type is THERMOMETER', async () => {
      const dto = {
        deviceId: '04',
        name: 'New Sensor',
        type: 'THERMOMETER' as const,
      };
      mockThermometerService.createThermometer.mockResolvedValue({
        id: 'thermo-2',
        ...dto,
      });

      const result = await service.createDevice(dto);

      expect(mockThermometerService.createThermometer).toHaveBeenCalledWith(
        dto,
      );
      expect(result.id).toBe('thermo-2');
    });
  });

  describe('updateDevice', () => {
    it('should update blind when type is BLIND', async () => {
      const dto = { name: 'Updated Blind', type: 'BLIND' as const };
      mockBlindService.updateBlind.mockResolvedValue({
        id: 'blind-1',
        ...dto,
      });

      const result = await service.updateDevice('blind-1', dto);

      expect(mockBlindService.updateBlind).toHaveBeenCalledWith('blind-1', dto);
      expect(result.name).toBe('Updated Blind');
    });

    it('should update thermometer when type is THERMOMETER', async () => {
      const dto = { name: 'Updated Sensor', type: 'THERMOMETER' as const };
      mockThermometerService.updateThermometer.mockResolvedValue({
        id: 'thermo-1',
        ...dto,
      });

      const result = await service.updateDevice('thermo-1', dto);

      expect(mockThermometerService.updateThermometer).toHaveBeenCalledWith(
        'thermo-1',
        dto,
      );
      expect(result.name).toBe('Updated Sensor');
    });
  });

  describe('getAllDevices', () => {
    it('should merge and sort devices by createdAt desc', async () => {
      mockThermometerService.getAllThermometers.mockResolvedValue([
        mockThermometer,
      ]);
      mockBlindService.getAllBlinds.mockResolvedValue([mockBlind]);

      const result = await service.getAllDevices();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(mockThermometer);
      expect(result[1]).toEqual(mockBlind);
    });

    it('should return empty array when no devices exist', async () => {
      mockThermometerService.getAllThermometers.mockResolvedValue([]);
      mockBlindService.getAllBlinds.mockResolvedValue([]);

      const result = await service.getAllDevices();

      expect(result).toEqual([]);
    });
  });
});
