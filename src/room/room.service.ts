import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { DatabaseService } from 'src/database/database.service';
import { connectDeviceToJoinTableMapper } from './room.mapper';

@Injectable()
export class RoomService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async getAllRooms() {
    return await this.databaseService.room.findMany({
      include: {
        thermometers: {
          include: {
            thermometer: true,
          },
        },
        blinds: {
          include: {
            blind: true,
          },
        },
      },
    });
  }

  async getOneRoom(id: string) {
    return await this.databaseService.room.findUnique({
      where: { id },
      include: {
        thermometers: {
          include: {
            thermometer: {
              include: {
                data: true,
              },
            },
          },
        },
        blinds: {
          include: {
            blind: true,
          },
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

  async deleteRoom(id: string) {
    return await this.databaseService.room.delete({
      where: { id },
    });
  }
}
