import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { ThermometerModule } from './thermometer/thermometer.module';
import { ThermometerDataModule } from './thermometer-data/thermometer-data.module';
import { BlindModule } from './blind/blind.module';

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
    ThermometerModule,
    ThermometerDataModule,
    BlindModule,
  ],
})
export class AppModule {}
