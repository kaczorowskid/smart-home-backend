import { Injectable } from '@nestjs/common';
import { dateLastDay } from 'src/constants/date.const';
import { DatabaseService } from 'src/database/database.service';
import { mapValuesFromDevice } from './thermometer-data.mapper';
import { CreateThermometerDatumDto } from './dto/create-thermometer-datum.dto';

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

  async getOneThermometerDataLogs(id: string) {
    const { to, from } = dateLastDay;

    return await this.databaseService.thermometerData.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        Thermometer: {
          id,
        },
        createdAt: {
          lte: to,
          gte: from,
        },
      },
    });
  }
}
