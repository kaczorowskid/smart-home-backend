import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.databaseService.user.create({ data: createUserDto });
  }

  async getAllUsers() {
    return await this.databaseService.user.findMany({});
  }

  async getOneUser(email: string) {
    return await this.databaseService.user.findUnique({
      where: { email },
    });
  }
}
