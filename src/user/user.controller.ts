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
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Body() createUserByAdminDto: CretaeUserByAdminDto) {
    return this.userService.createUserByAdmin(createUserByAdminDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.userService.getOneUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  async registerAndVerifyUser(
    @Param('id') id: string,
    @Body() registerUserDto: RegisterUserDto,
  ) {
    return this.userService.registerAndVerifyUser(id, registerUserDto);
  }

  @Get('/token/:token')
  getUserByToken(@Param('token') token: string) {
    return this.userService.getUserByToken(token);
  }
}
