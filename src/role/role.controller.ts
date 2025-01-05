import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import { PermissionType } from '@prisma/client';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('permission')
  getAllPermissions() {
    return this.roleService.getAllPermissions();
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_ROLE])
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_ROLES])
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_ROLES])
  @Get(':id')
  getOneRole(@Param('id') id: string) {
    return this.roleService.getOneRole(id);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_UPDATE_ROLE])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_ROLE])
  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
