import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { ThermometerModule } from './thermometer/thermometer.module';
import { ThermometerDataModule } from './thermometer-data/thermometer-data.module';
import { BlindModule } from './blind/blind.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { RoomModule } from './room/room.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/exceptions/prisma-exceptions.filter';
import { RoleModule } from './role/role.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DevicesModule,
    ThermometerModule,
    ThermometerDataModule,
    BlindModule,
    UserModule,
    AuthModule,
    EmailModule,
    RoomModule,
    RoleModule,
  ],
})
export class AppModule {}
