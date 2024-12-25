import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CretaeUserByAdminDto } from './dto/create-user-by-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @IsAdmin()
  @Post()
  async createUser(@Body() createUserByAdminDto: CretaeUserByAdminDto) {
    return this.userService.createUserByAdmin(createUserByAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneUserById(@Param('id') id: string) {
    return this.userService.getOneUserById(id);
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @IsAdmin()
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @IsAdmin()
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch('/verify/:id')
  async verifyUser(
    @Param('id') id: string,
    @Body() udpateUserDto: UpdateUserDto,
  ) {
    return this.userService.verifyUser(id, udpateUserDto);
  }

  @Get('/token/:token')
  getUserByToken(@Param('token') token: string) {
    return this.userService.getUserByToken(token);
  }
}
