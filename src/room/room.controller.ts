import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { PermissionType } from '@prisma/client';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_ROOM])
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.ROOMS_VIEW])
  @Get()
  findAll() {
    return this.roomService.getAllRooms();
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.ROOMS_VIEW])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.getOneRoom(id);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_UPDATE_ROOM])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateRoom(id, updateRoomDto);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_ROOM])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
