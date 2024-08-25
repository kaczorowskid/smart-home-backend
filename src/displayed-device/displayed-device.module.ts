import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DisplayedDeviceController } from './displayed-device.controller';
import { DisplayedDeviceService } from './displayed-device.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DisplayedDeviceController],
  providers: [DisplayedDeviceService],
})
export class DisplayedDeviceModule {}
