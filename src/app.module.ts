import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { DisplayedDeviceModule } from './displayed-device/displayed-device.module';
import { DisplayedDeviceService } from './displayed-device/displayed-device.service';
import { DisplayedDeviceController } from './displayed-device/displayed-device.controller';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
    DevicesModule,
    DisplayedDeviceModule,
  ],
  providers: [DisplayedDeviceService],
  controllers: [DisplayedDeviceController],
})
export class AppModule {}
