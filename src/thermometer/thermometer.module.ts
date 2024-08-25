import { Module } from '@nestjs/common';
import { ThermometerService } from './thermometer.service';
import { ThermometerController } from './thermometer.controller';

@Module({
  controllers: [ThermometerController],
  providers: [ThermometerService],
})
export class ThermometerModule {}
