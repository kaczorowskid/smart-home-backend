import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.createDevice(createDeviceDto);
  }

  @Get()
  findAllWithSearch(@Query('name') name: string) {
    return this.devicesService.findAllWithSearch(name);
  }

  @Get(':id')
  getOneDevice(@Param('id') id: string) {
    return this.devicesService.getOneDevice(id);
  }

  @Patch(':id')
  updateDevice(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.updateDevice(id, updateDeviceDto);
  }

  @Delete(':id')
  deleteDevice(@Param('id') id: string) {
    return this.devicesService.deleteDevice(id);
  }

  @Get(':id/data')
  getDataFromDevice(@Param('id') id: string) {
    return this.devicesService.getDataFromDevice(id);
  }
}
