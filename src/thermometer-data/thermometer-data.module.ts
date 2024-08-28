import { Module } from '@nestjs/common';
import { ThermometerDataService } from './thermometer-data.service';
import { ThermometerDataController } from './thermometer-data.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ThermometerDataController],
  providers: [ThermometerDataService],
})
export class ThermometerDataModule {}
