import { Injectable } from '@nestjs/common';
import { CreateThermometerDto } from './dto/create-thermometer.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ThermometerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createThermometerDto: CreateThermometerDto) {
    return await this.databaseService.thermometer.create({
      data: createThermometerDto,
    });
  }
}
