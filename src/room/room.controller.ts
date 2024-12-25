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
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';

@UseGuards(JwtAuthGuard, IsAdminGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @IsAdmin()
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.getAllRooms();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.getOneRoom(id);
  }

  @IsAdmin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateRoom(id, updateRoomDto);
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
