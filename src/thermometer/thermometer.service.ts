import { Injectable } from '@nestjs/common';
import { CreateThermometerDto } from './dto/create-thermometer.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateThermometerDto } from './dto/update-thermometer.dto';

@Injectable()
export class ThermometerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createThermometer(createThermometerDto: CreateThermometerDto) {
    return await this.databaseService.thermometer.create({
      data: createThermometerDto,
    });
  }

  async getAllThermometers() {
    return await this.databaseService.thermometer.findMany({});
  }

  async getOneThermometer(id: string) {
    return await this.databaseService.thermometer.findUnique({
      where: { id },
      include: {
        data: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
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

  async deleteThermometer(id: string) {
    return await this.databaseService.thermometer.delete({
      where: { id },
    });
  }

  async getDataForGraph(id: string) {
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
        },
      },
    });
  }
}
