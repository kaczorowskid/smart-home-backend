import { Module } from '@nestjs/common';
import { ThermometerService } from './thermometer.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ThermometerService],
  exports: [ThermometerService],
})
export class ThermometerModule {}
