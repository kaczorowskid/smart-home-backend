import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DisplayedDeviceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createOrUpdateDevice(order: string, body: { id: string }) {
    return this.databaseService.displayedDevice.upsert({
      where: {
        order: Number(order),
      },
      update: {
        device_id: body.id,
      },
      create: {
        order: Number(order),
        device_id: body.id,
      },
    });
  }

  async getDeviceToDisplay(order: string) {
    const items = await this.databaseService.displayedDevice.findFirst({
      where: {
        order: Number(order),
      },
      select: {
        order: true,
        device: {
          select: {
            name: true,
            type: true,
            thermometers: {
              select: {
                date: true,
                temperature: true,
                humidity: true,
              },
              take: 1,
            },
          },
        },
      },
    });

    return {
      order: items?.order,
      name: items?.device.name,
      type: items?.device.type,
      thermometers: items?.device.thermometers[0],
    };
  }
}
