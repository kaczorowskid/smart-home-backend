import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeleteDeviceDto } from './dto/delete-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceServices: DevicesService) {}

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceServices.createDevice(createDeviceDto);
  }

  @Get()
  getAllDevices() {
    return this.deviceServices.getAllDevices();
  }

  @Get('/thermometers')
  getAllThermometers() {
    return this.deviceServices.getAllThermometers();
  }

  @Get('/blinds')
  getAllBlinds() {
    return this.deviceServices.getAllBlinds();
  }

  @Get(':id')
  getOneDevices(@Param('id') id: string) {
    return this.deviceServices.getOneDevices(id);
  }

  @Patch(':id')
  updateDevice(
    @Param('id') id: string,
    @Body() updateBlindDto: UpdateDeviceDto,
  ) {
    return this.deviceServices.updateDevice(id, updateBlindDto);
  }

  @Delete(':id')
  deleteDevice(
    @Param('id') id: string,
    @Body() deleteDeviceDto: DeleteDeviceDto,
  ) {
    return this.deviceServices.deleteDevice(id, deleteDeviceDto);
  }

  @Get(':id/data')
  getDataForGraph(@Param('id') id: string) {
    return this.deviceServices.getDataForGraph(id);
  }
}
