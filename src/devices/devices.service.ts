import { Injectable } from '@nestjs/common';
import { BlindService } from 'src/blind/blind.service';
import { ThermometerService } from 'src/thermometer/thermometer.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeleteDeviceDto } from './dto/delete-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    private readonly thermometerService: ThermometerService,
    private readonly blindService: BlindService,
  ) {}

  async createDevice(createDeviceDto: CreateDeviceDto) {
    if (createDeviceDto.type === 'BLIND') {
      return await this.blindService.createBlind(createDeviceDto);
    } else {
      return await this.thermometerService.createThermometer(createDeviceDto);
    }
  }

  async updateDevice(id: string, updateDeviceDto: UpdateDeviceDto) {
    if (updateDeviceDto.type === 'BLIND') {
      return await this.blindService.updateBlind(id, updateDeviceDto);
    } else {
      return await this.thermometerService.updateThermometer(
        id,
        updateDeviceDto,
      );
    }
  }

  async deleteDevice(id: string, deleteDeviceDto: DeleteDeviceDto) {
    if (deleteDeviceDto.type === 'BLIND') {
      return await this.blindService.deleteBlind(id);
    } else {
      return await this.thermometerService.deleteThermometer(id);
    }
  }

  async getAllDevices() {
    const [thermometers, blinds] = await Promise.all([
      this.thermometerService.getAllThermometers(),
      this.blindService.getAllBlinds(),
    ]);

    const allDevices = [...thermometers, ...blinds];

    return allDevices.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async getAllThermometers() {
    return await this.thermometerService.getAllThermometers();
  }

  async getAllBlinds() {
    return await this.blindService.getAllBlinds();
  }

  async getOneDevices(id: string) {
    const [thermometers, blinds] = await Promise.all([
      this.thermometerService.getOneThermometer(id),
      this.blindService.getOneBlind(id),
    ]);

    return thermometers || blinds;
  }

  async getDataForGraph(id: string) {
    return await this.thermometerService.getDataForGraph(id);
  }
}
