import { Controller, Get, Param } from '@nestjs/common';
import { ThermometerDataService } from './thermometer-data.service';
import { CreateThermometerDatumDto } from './dto/create-thermometer-datum.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { sensorsTopics } from 'src/constants/sensors-topics.constants';

@Controller('thermometer-data')
export class ThermometerDataController {
  constructor(
    private readonly thermometerDataService: ThermometerDataService,
  ) {}

  @EventPattern(sensorsTopics.thermometerData)
  createThermometerDatum(
    @Payload() createThermometerDatumDto: CreateThermometerDatumDto,
  ) {
    return this.thermometerDataService.createThermometerDatum(
      createThermometerDatumDto,
    );
  }

  @Get()
  getAllThermometerData() {
    return this.thermometerDataService.getAllThermometerData();
  }

  @Get(':id')
  getOneThermometerData(@Param('id') id: string) {
    return this.thermometerDataService.getOneThermometerData(id);
  }
}
