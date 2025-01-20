import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
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
    return await this.databaseService.thermometerData.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        Thermometer: {
          id,
        },
        createdAt: {
          lte: endOfDay(new Date()),
          gte: startOfDay(new Date()),
        },
      },
    });
  }
}
