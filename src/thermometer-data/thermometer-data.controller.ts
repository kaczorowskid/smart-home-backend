import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ThermometerDataService } from './thermometer-data.service';
import { CreateThermometerDatumDto } from './dto/create-thermometer-datum.dto';

@Controller('thermometer-data')
export class ThermometerDataController {
  constructor(
    private readonly thermometerDataService: ThermometerDataService,
  ) {}

  @Post()
  createThermometerDatum(
    @Body() createThermometerDatumDto: CreateThermometerDatumDto,
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
