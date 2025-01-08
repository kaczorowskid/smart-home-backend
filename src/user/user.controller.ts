import { PermissionType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CretaeUserByAdminDto } from './dto/create-user-by-admin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/token/:token')
  getUserByToken(@Param('token') token: string) {
    return this.userService.getUserByToken(token);
  }

  @Patch('/verify/:id')
  async verifyUser(
    @Param('id') id: string,
    @Body() udpateUserDto: UpdateUserDto,
  ) {
    return this.userService.verifyUser(id, udpateUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_USERS])
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/roles')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_ROLES])
  getAllRoles() {
    return this.userService.getAllRoles();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_USERS])
  getOneUserById(@Param('id') id: string) {
    return this.userService.getOneUserById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_USER])
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_USER])
  async createUser(@Body() createUserByAdminDto: CretaeUserByAdminDto) {
    return this.userService.createUserByAdmin(createUserByAdminDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_USER])
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
