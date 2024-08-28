import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { ThermometerModule } from 'src/thermometer/thermometer.module';
import { BlindModule } from 'src/blind/blind.module';

@Module({
  imports: [ThermometerModule, BlindModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
