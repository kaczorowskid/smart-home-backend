import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { DisplayedDeviceService } from './displayed-device.service';

@Controller('displayed-device')
export class DisplayedDeviceController {
  constructor(
    private readonly dysplayedDeviceService: DisplayedDeviceService,
  ) {}

  @Get(':order')
  getDeviceToDisplay(@Param('order') order: string) {
    return this.dysplayedDeviceService.getDeviceToDisplay(order);
  }

  @Put(':order')
  createOrUpdateDevice(
    @Param('order') order: string,
    @Body() body: { id: string },
  ) {
    return this.dysplayedDeviceService.createOrUpdateDevice(order, body);
  }
}
