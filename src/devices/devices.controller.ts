import { PermissionType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeleteDeviceDto } from './dto/delete-device.dto';

@Controller('devices')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DevicesController {
  constructor(private readonly deviceServices: DevicesService) {}

  @Get('/blinds')
  getAllBlinds() {
    return this.deviceServices.getAllBlinds();
  }

  @Get('/thermometers')
  getAllThermometers() {
    return this.deviceServices.getAllThermometers();
  }

  @Get()
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_DEVICES])
  getAllDevices() {
    return this.deviceServices.getAllDevices();
  }

  @Get(':id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_DEVICES])
  getOneDevice(@Param('id') id: string) {
    return this.deviceServices.getOneDevice(id);
  }

  @Post()
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_DEVICE])
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceServices.createDevice(createDeviceDto);
  }

  @Patch(':id')
  @HasPermission([
    PermissionType.IS_ADMIN,
    PermissionType.OPTIONS_UPDATE_DEVICE,
  ])
  updateDevice(
    @Param('id') id: string,
    @Body() updateBlindDto: UpdateDeviceDto,
  ) {
    return this.deviceServices.updateDevice(id, updateBlindDto);
  }

  @Delete(':id')
  @HasPermission([
    PermissionType.IS_ADMIN,
    PermissionType.OPTIONS_DELETE_DEVICE,
  ])
  deleteDevice(
    @Param('id') id: string,
    @Body() deleteDeviceDto: DeleteDeviceDto,
  ) {
    return this.deviceServices.deleteDevice(id, deleteDeviceDto);
  }

  @Get('/data/:id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_DEVICES])
  getDataForGraph(
    @Param('id') id: string,
    @Query('dateFrom') dateFrom: Date,
    @Query('dateTo') dateTo: Date,
  ) {
    return this.deviceServices.getDataForGraph(id, dateFrom, dateTo);
  }
}
