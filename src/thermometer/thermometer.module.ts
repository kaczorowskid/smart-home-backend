import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ThermometerDataModule } from 'src/thermometer-data/thermometer-data.module';
import { ThermometerService } from './thermometer.service';

@Module({
  exports: [ThermometerService],
  providers: [ThermometerService],
  imports: [DatabaseModule, ThermometerDataModule],
})
export class ThermometerModule {}
