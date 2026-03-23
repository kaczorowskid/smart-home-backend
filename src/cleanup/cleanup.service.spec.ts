import { Test, type TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { CleanupService } from './cleanup.service';

const mockDatabaseService = {
  thermometerData: {
    deleteMany: jest.fn(),
  },
};

describe('CleanupService', () => {
  let service: CleanupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CleanupService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<CleanupService>(CleanupService);
    jest.clearAllMocks();
  });

  describe('cleanupOldRecords', () => {
    it('should delete records older than 35 days', async () => {
      mockDatabaseService.thermometerData.deleteMany.mockResolvedValue({
        count: 10,
      });

      await service.cleanupOldRecords();

      const callArgs =
        mockDatabaseService.thermometerData.deleteMany.mock.calls[0][0];
      const cutoffDate = callArgs.where.createdAt.lt as Date;
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - 35);

      expect(cutoffDate.toDateString()).toBe(expectedDate.toDateString());
    });

    it('should log deleted count on success', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockDatabaseService.thermometerData.deleteMany.mockResolvedValue({
        count: 5,
      });

      await service.cleanupOldRecords();

      expect(consoleSpy).toHaveBeenCalledWith('Removed 5 records');
      consoleSpy.mockRestore();
    });

    it('should log error on failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('DB connection failed');
      mockDatabaseService.thermometerData.deleteMany.mockRejectedValue(error);

      await service.cleanupOldRecords();

      expect(consoleSpy).toHaveBeenCalledWith('Cleanup error:', error);
      consoleSpy.mockRestore();
    });
  });
});
