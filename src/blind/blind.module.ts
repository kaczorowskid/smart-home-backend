import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BlindService } from './blind.service';

@Module({
  exports: [BlindService],
  imports: [DatabaseModule],
  providers: [BlindService],
})
export class BlindModule {}
