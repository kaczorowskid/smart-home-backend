import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ThermometerDataService } from './thermometer-data.service';
import { ThermometerDataController } from './thermometer-data.controller';

@Module({
  exports: [ThermometerDataService],
  providers: [ThermometerDataService],
  controllers: [ThermometerDataController],
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_BROKER_URL,
        },
      },
    ]),
  ],
})
export class ThermometerDataModule {}
