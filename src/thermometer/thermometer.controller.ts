import { Controller, Post, Body } from '@nestjs/common';
import { ThermometerService } from './thermometer.service';
import { CreateThermometerDto } from './dto/create-thermometer.dto';

@Controller('thermometer')
export class ThermometerController {
  constructor(private readonly thermometerService: ThermometerService) {}

  @Post()
  create(@Body() createThermometerDto: CreateThermometerDto) {
    return this.thermometerService.create(createThermometerDto);
  }
}
