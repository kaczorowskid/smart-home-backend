import { Module } from '@nestjs/common';
import { BlindModule } from 'src/blind/blind.module';
import { ThermometerModule } from 'src/thermometer/thermometer.module';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';

@Module({
  providers: [DevicesService],
  controllers: [DevicesController],
  imports: [ThermometerModule, BlindModule],
})
export class DevicesModule {}
