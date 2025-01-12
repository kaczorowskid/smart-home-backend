import { Injectable } from '@nestjs/common';
import { ONE_MINUTE_MS } from 'src/constants/time';
import { DatabaseService } from 'src/database/database.service';
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

  async getAllThermometers() {
    const thermometers = await this.databaseService.thermometer.findMany({
      include: {
        data: {
          take: 1,
          select: {
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    const now = new Date();
    const twelveMinutes = ONE_MINUTE_MS * 12;

    return thermometers.map((thermometer) => {
      const { data, ...rest } = thermometer;

      if (!data || data.length === 0) {
        return { ...rest, status: 'offline' };
      }

      const latestDataDate = new Date(data[0].createdAt);
      const timeDifference = now.getTime() - latestDataDate.getTime();
      const status = timeDifference > twelveMinutes ? 'offline' : 'online';

      return { ...rest, status };
    });
  }
}
