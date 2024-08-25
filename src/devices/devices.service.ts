import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DevicesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createDevice(createDeviceDto: CreateDeviceDto) {
    return await this.databaseService.device.create({ data: createDeviceDto });
  }

  async findAllWithSearch(name: string) {
    return await this.databaseService.device.findMany({
      orderBy: {
        created_at: 'desc',
      },
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async getOneDevice(id: string) {
    return await this.databaseService.device.findUnique({
      where: { id },
      include: {
        thermometers: {
          orderBy: {
            date: 'desc',
          },
          select: {
            humidity: true,
            temperature: true,
            date: true,
          },
          take: 1,
        },
      },
    });
  }

  async updateDevice(id: string, updateDeviceDto: UpdateDeviceDto) {
    return await this.databaseService.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  async deleteDevice(id: string) {
    return await this.databaseService.device.delete({
      where: { id },
    });
  }

  async getDataFromDevice(id: string) {
    return await this.databaseService.device.findUnique({
      where: { id },
      select: {
        name: true,
        thermometers: {
          select: {
            temperature: true,
            humidity: true,
            date: true,
          },
        },
      },
    });
  }
}
