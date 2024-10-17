import { Injectable } from '@nestjs/common';
import { CreateThermometerDatumDto } from './dto/create-thermometer-datum.dto';
import { DatabaseService } from 'src/database/database.service';
import { mapValuesFromDevice } from './thermometer-data.mapper';

@Injectable()
export class ThermometerDataService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createThermometerDatum(
    createThermometerDatumDto: CreateThermometerDatumDto,
  ) {
    return await this.databaseService.thermometerData.create({
      data: mapValuesFromDevice(createThermometerDatumDto),
    });
  }

  async getAllThermometerData() {
    return await this.databaseService.thermometerData.findMany({});
  }

  async getOneThermometerData(id: string) {
    return await this.databaseService.thermometerData.findUnique({
      where: {
        id,
      },
    });
  }
}
