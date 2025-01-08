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
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.ROOMS_VIEW])
  findAll() {
    return this.roomService.getAllRooms();
  }

  @Get(':id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.ROOMS_VIEW])
  findOne(@Param('id') id: string) {
    return this.roomService.getOneRoom(id);
  }

  @Delete(':id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_ROOM])
  remove(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }

  @Post()
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_ROOM])
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @Patch(':id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_UPDATE_ROOM])
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateRoom(id, updateRoomDto);
  }
}
