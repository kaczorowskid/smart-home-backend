import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { connectDeviceToJoinTableMapper } from './room.mapper';

@Injectable()
export class RoomService {
  constructor(private readonly databaseService: DatabaseService) {}

  async deleteRoom(id: string) {
    return await this.databaseService.room.delete({
      where: { id },
    });
  }

  async getAllRooms() {
    return await this.databaseService.room.findMany({
      include: {
        blinds: {
          include: {
            blind: true,
          },
        },
        thermometers: {
          include: {
            thermometer: true,
          },
        },
      },
    });
  }

  async getOneRoom(id: string) {
    return await this.databaseService.room.findUnique({
      where: { id },
      include: {
        blinds: {
          include: {
            blind: true,
          },
        },
        thermometers: {
          include: {
            thermometer: {
              include: {
                data: true,
              },
            },
          },
        },
      },
    });
  }

  async createRoom(createRoomDto: CreateRoomDto) {
    return await this.databaseService.room.create({
      data: {
        ...createRoomDto,
        blinds: {
          create: connectDeviceToJoinTableMapper(createRoomDto.blinds, 'blind'),
        },
        thermometers: {
          create: connectDeviceToJoinTableMapper(
            createRoomDto.thermometers,
            'thermometer',
          ),
        },
      },
    });
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto) {
    return await this.databaseService.room.update({
      where: { id },
      data: {
        ...updateRoomDto,

        blinds: {
          deleteMany: {
            roomId: id,
          },
          create: connectDeviceToJoinTableMapper(updateRoomDto.blinds, 'blind'),
        },
        thermometers: {
          deleteMany: {
            roomId: id,
          },
          create: connectDeviceToJoinTableMapper(
            updateRoomDto.thermometers,
            'thermometer',
          ),
        },
      },
    });
  }
}
