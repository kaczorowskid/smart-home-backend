import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeleteDeviceDto } from './dto/delete-device.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceServices: DevicesService) {}

  @Get('/thermometers')
  getAllThermometers() {
    return this.deviceServices.getAllThermometers();
  }

  @Get('/blinds')
  getAllBlinds() {
    return this.deviceServices.getAllBlinds();
  }

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceServices.createDevice(createDeviceDto);
  }

  @Get()
  getAllDevices() {
    return this.deviceServices.getAllDevices();
  }

  @Get(':id')
  getOneDevice(@Param('id') id: string) {
    return this.deviceServices.getOneDevice(id);
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
  getDataForGraph(
    @Param('id') id: string,
    @Query('dateFrom') dateFrom: Date,
    @Query('dateTo') dateTo: Date,
  ) {
    return this.deviceServices.getDataForGraph(id, dateFrom, dateTo);
  }
}
