import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/database/database.module';
import { CleanupService } from './cleanup.service';
import { CleanupController } from './cleanup.controller';

@Module({
  providers: [CleanupService],
  controllers: [CleanupController],
  imports: [ScheduleModule.forRoot(), DatabaseModule],
})
export class CleanupModule {}
