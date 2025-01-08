import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBlindDto } from './dto/create-blind.dto';
import { UpdateBlindDto } from './dto/update-blind.dto';

@Injectable()
export class BlindService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllBlinds() {
    return await this.databaseService.blind.findMany({});
  }

  async deleteBlind(id: string) {
    return await this.databaseService.blind.delete({
      where: { id },
    });
  }

  async getOneBlind(id: string) {
    return await this.databaseService.blind.findUnique({
      where: { id },
    });
  }

  async createBlind(createBlindDto: CreateBlindDto) {
    return await this.databaseService.blind.create({
      data: createBlindDto,
    });
  }

  async updateBlind(id: string, updateBlindDto: UpdateBlindDto) {
    return await this.databaseService.blind.update({
      where: { id },
      data: updateBlindDto,
    });
  }
}
