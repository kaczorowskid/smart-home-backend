import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { RoleModule } from './role/role.module';
import { BlindModule } from './blind/blind.module';
import { EmailModule } from './email/email.module';
import { DevicesModule } from './devices/devices.module';
import { DatabaseModule } from './database/database.module';
import { ThermometerModule } from './thermometer/thermometer.module';
import { ThermometerDataModule } from './thermometer-data/thermometer-data.module';
import { PrismaExceptionFilter } from './common/exceptions/prisma-exceptions.filter';

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
