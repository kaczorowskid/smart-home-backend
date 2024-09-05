import { Module } from '@nestjs/common';
import { BlindService } from './blind.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BlindService],
  exports: [BlindService],
})
export class BlindModule {}
