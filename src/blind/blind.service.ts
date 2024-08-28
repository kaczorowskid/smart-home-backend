import { Injectable } from '@nestjs/common';
import { CreateBlindDto } from './dto/create-blind.dto';
import { UpdateBlindDto } from './dto/update-blind.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BlindService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createBlind(createBlindDto: CreateBlindDto) {
    return this.databaseService.blind.create({
      data: createBlindDto,
    });
  }

  async getAllBlinds() {
    return await this.databaseService.blind.findMany({});
  }

  async getOneBlind(id: string) {
    return await this.databaseService.blind.findUnique({
      where: { id },
    });
  }

  async updateBlind(id: string, updateBlindDto: UpdateBlindDto) {
    return await this.databaseService.blind.update({
      where: { id },
      data: updateBlindDto,
    });
  }

  async deleteBlind(id: string) {
    return await this.databaseService.blind.delete({
      where: { id },
    });
  }
}
