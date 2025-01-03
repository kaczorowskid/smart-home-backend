import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('permission')
  getAllPermissions() {
    return this.roleService.getAllPermissions();
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  getOneRole(@Param('id') id: string) {
    return this.roleService.getOneRole(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
