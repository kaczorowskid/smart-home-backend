import { Test, type TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { BlindService } from './blind.service';

const mockBlind = {
  id: 'blind-1',
  type: 'BLIND',
  deviceId: '01',
  name: 'Kitchen Blind',
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};

const mockDatabaseService = {
  blind: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('BlindService', () => {
  let service: BlindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlindService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<BlindService>(BlindService);
    jest.clearAllMocks();
  });

  describe('getAllBlinds', () => {
    it('should return all blinds', async () => {
      mockDatabaseService.blind.findMany.mockResolvedValue([mockBlind]);

      const result = await service.getAllBlinds();

      expect(result).toEqual([mockBlind]);
      expect(mockDatabaseService.blind.findMany).toHaveBeenCalledWith({});
    });
  });

  describe('getOneBlind', () => {
    it('should return blind by id', async () => {
      mockDatabaseService.blind.findUnique.mockResolvedValue(mockBlind);

      const result = await service.getOneBlind('blind-1');

      expect(result).toEqual(mockBlind);
      expect(mockDatabaseService.blind.findUnique).toHaveBeenCalledWith({
        where: { id: 'blind-1' },
      });
    });
  });

  describe('createBlind', () => {
    it('should create a blind', async () => {
      const dto = {
        deviceId: '02',
        name: 'Bedroom Blind',
        type: 'BLIND' as const,
      };
      mockDatabaseService.blind.create.mockResolvedValue({
        id: 'blind-2',
        ...dto,
      });

      const result = await service.createBlind(dto);

      expect(result.id).toBe('blind-2');
      expect(mockDatabaseService.blind.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('deleteBlind', () => {
    it('should delete blind by id', async () => {
      mockDatabaseService.blind.delete.mockResolvedValue(mockBlind);

      const result = await service.deleteBlind('blind-1');

      expect(result).toEqual(mockBlind);
      expect(mockDatabaseService.blind.delete).toHaveBeenCalledWith({
        where: { id: 'blind-1' },
      });
    });
  });

  describe('updateBlind', () => {
    it('should update blind with provided data', async () => {
      const dto = { name: 'Updated Blind' };
      mockDatabaseService.blind.update.mockResolvedValue({
        ...mockBlind,
        ...dto,
      });

      const result = await service.updateBlind('blind-1', dto);

      expect(result.name).toBe('Updated Blind');
      expect(mockDatabaseService.blind.update).toHaveBeenCalledWith({
        data: dto,
        where: { id: 'blind-1' },
      });
    });
  });
});
