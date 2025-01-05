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
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import { PermissionType } from '@prisma/client';

@UseGuards(JwtAuthGuard, PermissionsGuard)
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

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_DEVICES])
  @Get('/data/:id')
  getDataForGraph(
    @Param('id') id: string,
    @Query('dateFrom') dateFrom: Date,
    @Query('dateTo') dateTo: Date,
  ) {
    return this.deviceServices.getDataForGraph(id, dateFrom, dateTo);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_DEVICE])
  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceServices.createDevice(createDeviceDto);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_DEVICES])
  @Get()
  getAllDevices() {
    return this.deviceServices.getAllDevices();
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_DEVICES])
  @Get(':id')
  getOneDevice(@Param('id') id: string) {
    return this.deviceServices.getOneDevice(id);
  }

  @HasPermission([
    PermissionType.IS_ADMIN,
    PermissionType.OPTIONS_UPDATE_DEVICE,
  ])
  @Patch(':id')
  updateDevice(
    @Param('id') id: string,
    @Body() updateBlindDto: UpdateDeviceDto,
  ) {
    return this.deviceServices.updateDevice(id, updateBlindDto);
  }

  @HasPermission([
    PermissionType.IS_ADMIN,
    PermissionType.OPTIONS_DELETE_DEVICE,
  ])
  @Delete(':id')
  deleteDevice(
    @Param('id') id: string,
    @Body() deleteDeviceDto: DeleteDeviceDto,
  ) {
    return this.deviceServices.deleteDevice(id, deleteDeviceDto);
  }
}
