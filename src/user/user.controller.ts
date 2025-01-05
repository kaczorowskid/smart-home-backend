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
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import { PermissionType } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_ROLES])
  @Get('/roles')
  getAllRoles() {
    return this.userService.getAllRoles();
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_USER])
  @Post()
  async createUser(@Body() createUserByAdminDto: CretaeUserByAdminDto) {
    return this.userService.createUserByAdmin(createUserByAdminDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_USERS])
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_USERS])
  @Get(':id')
  getOneUserById(@Param('id') id: string) {
    return this.userService.getOneUserById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_USER])
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_USER])
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
