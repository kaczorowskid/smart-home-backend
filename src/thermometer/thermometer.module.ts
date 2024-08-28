import { Module } from '@nestjs/common';
import { ThermometerService } from './thermometer.service';
import { ThermometerController } from './thermometer.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ThermometerController],
  providers: [ThermometerService],
  exports: [ThermometerService],
})
export class ThermometerModule {}
