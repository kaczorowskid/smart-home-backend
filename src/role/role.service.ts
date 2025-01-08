import { Injectable } from '@nestjs/common';
import { PermissionType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllPermissions() {
    return Object.values(PermissionType);
  }

  async deleteRole(id: string) {
    return await this.databaseService.role.delete({
      where: { id },
    });
  }

  async getAllRoles() {
    return await this.databaseService.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async getOneRole(id: string) {
    return await this.databaseService.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });
  }

  async createRole(createRoleDto: CreateRoleDto) {
    return await this.databaseService.role.create({
      data: {
        ...createRoleDto,
        permissions: {
          create: createRoleDto.permissions.map((permission) => ({
            permission,
          })),
        },
      },
    });
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.databaseService.role.update({
      where: { id },
      data: {
        ...updateRoleDto,
        permissions: {
          deleteMany: {
            roleId: id,
          },
          create: updateRoleDto.permissions.map((permission) => ({
            permission,
          })),
        },
      },
    });
  }
}
