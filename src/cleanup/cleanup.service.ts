import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CleanupService {
  constructor(private readonly databaseService: DatabaseService) {}

  async cleanupOldRecords() {
    const fiveWeeksAgo = new Date();
    fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - 35);

    try {
      const result = await this.databaseService.thermometerData.deleteMany({
        where: {
          createdAt: { lt: fiveWeeksAgo },
        },
      });

      console.log(`Removed ${result.count} records`);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}
