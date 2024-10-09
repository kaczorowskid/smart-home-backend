import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CretaeUserByAdminDto } from './dto/create-user-by-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserByAdminDto: CretaeUserByAdminDto) {
    return this.userService.createUserByAdmin(createUserByAdminDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':email')
  getOneUser(@Param('email') email: string) {
    return this.userService.getOneUser(email);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch(':id/verify')
  async createAndVerifyUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.createAndVerifyUser(id, createUserDto);
  }

  @Get('/token/:token')
  getUserByToken(@Param('token') token: string) {
    return this.userService.getUserByToken(token);
  }
}
