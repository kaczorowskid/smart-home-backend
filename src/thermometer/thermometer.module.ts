import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ThermometerService } from './thermometer.service';

@Module({
  imports: [DatabaseModule],
  exports: [ThermometerService],
  providers: [ThermometerService],
})
export class ThermometerModule {}
