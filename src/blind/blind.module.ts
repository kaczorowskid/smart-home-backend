import { Module } from '@nestjs/common';
import { BlindService } from './blind.service';
import { BlindController } from './blind.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BlindController],
  providers: [BlindService],
  exports: [BlindService],
})
export class BlindModule {}
