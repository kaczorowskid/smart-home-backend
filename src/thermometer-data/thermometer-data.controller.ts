import { PermissionType } from '@prisma/client';
import { Payload, EventPattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Get, Param, UseGuards, Controller } from '@nestjs/common';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { sensorsTopics } from 'src/constants/sensors-topics.constants';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import { ThermometerDataService } from './thermometer-data.service';
import { CreateThermometerDatumDto } from './dto/create-thermometer-datum.dto';

@Controller('thermometer-data')
export class ThermometerDataController {
  constructor(
    private readonly thermometerDataService: ThermometerDataService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.GRAPHS_VIEW])
  getAllThermometerData() {
    return this.thermometerDataService.getAllThermometerData();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.GRAPHS_VIEW])
  getOneThermometerData(@Param('id') id: string) {
    return this.thermometerDataService.getOneThermometerData(id);
  }

  @EventPattern(sensorsTopics.thermometerData)
  createThermometerDatum(
    @Payload() createThermometerDatumDto: CreateThermometerDatumDto,
  ) {
    return this.thermometerDataService.createThermometerDatum(
      createThermometerDatumDto,
    );
  }
}
