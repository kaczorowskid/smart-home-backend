import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ThermometerDataService } from './thermometer-data.service';
import { CreateThermometerDatumDto } from './dto/create-thermometer-datum.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { sensorsTopics } from 'src/constants/sensors-topics.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import { PermissionType } from '@prisma/client';

@Controller('thermometer-data')
export class ThermometerDataController {
  constructor(
    private readonly thermometerDataService: ThermometerDataService,
  ) {}

  @EventPattern(sensorsTopics.thermometerData)
  createThermometerDatum(
    @Payload() createThermometerDatumDto: CreateThermometerDatumDto,
  ) {
    return this.thermometerDataService.createThermometerDatum(
      createThermometerDatumDto,
    );
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.GRAPHS_VIEW])
  @Get()
  getAllThermometerData() {
    return this.thermometerDataService.getAllThermometerData();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.GRAPHS_VIEW])
  @Get(':id')
  getOneThermometerData(@Param('id') id: string) {
    return this.thermometerDataService.getOneThermometerData(id);
  }
}
