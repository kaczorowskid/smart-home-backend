import { Module } from '@nestjs/common';
import { ThermometerDataService } from './thermometer-data.service';
import { ThermometerDataController } from './thermometer-data.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
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
  controllers: [ThermometerDataController],
  providers: [ThermometerDataService],
})
export class ThermometerDataModule {}
