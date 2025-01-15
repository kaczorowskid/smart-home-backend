import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { mapThermometerStatus } from './thermometer.mapper';
import { CreateThermometerDto } from './dto/create-thermometer.dto';
import { UpdateThermometerDto } from './dto/update-thermometer.dto';

@Injectable()
export class ThermometerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async deleteThermometer(id: string) {
    return await this.databaseService.thermometer.delete({
      where: { id },
    });
  }

  async createThermometer(createThermometerDto: CreateThermometerDto) {
    return await this.databaseService.thermometer.create({
      data: createThermometerDto,
    });
  }

  async updateThermometer(
    id: string,
    updateThermometerDto: UpdateThermometerDto,
  ) {
    return await this.databaseService.thermometer.update({
      where: { id },
      data: updateThermometerDto,
    });
  }

  async getOneThermometer(id: string) {
    const thermometer = await this.databaseService.thermometer.findUnique({
      where: { id },
      include: {
        data: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return mapThermometerStatus(thermometer);
  }

  async getAllThermometers() {
    const thermometers = await this.databaseService.thermometer.findMany({
      include: {
        data: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return thermometers.map((thermometer) => mapThermometerStatus(thermometer));
  }

  async getDataForGraph(id: string, dateFrom: Date, dateTo: Date) {
    return await this.databaseService.thermometer.findUnique({
      where: { id },
      select: {
        name: true,
        data: {
          select: {
            date: true,
            humidity: true,
            temperature: true,
          },
          where: {
            date: {
              lte: dateTo,
              gte: dateFrom,
            },
          },
        },
      },
    });
  }
}
