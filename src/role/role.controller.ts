import { PermissionType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { HasPermission } from 'src/auth/decorators/has-permission.decorator';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('permission')
  getAllPermissions() {
    return this.roleService.getAllPermissions();
  }

  @Get()
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_ROLES])
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_VIEW_ROLES])
  getOneRole(@Param('id') id: string) {
    return this.roleService.getOneRole(id);
  }

  @Delete(':id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_DELETE_ROLE])
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }

  @Post()
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_ADD_ROLE])
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Patch(':id')
  @HasPermission([PermissionType.IS_ADMIN, PermissionType.OPTIONS_UPDATE_ROLE])
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }
}
