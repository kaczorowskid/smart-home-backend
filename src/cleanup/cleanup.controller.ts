import { Cron } from '@nestjs/schedule';
import { Controller } from '@nestjs/common';
import { CleanupService } from './cleanup.service';

@Controller('cleanup')
export class CleanupController {
  constructor(private readonly cleanupService: CleanupService) {}

  @Cron('0 0 * * *')
  async cleanupOldRecords() {
    await this.cleanupService.cleanupOldRecords();
  }
}
