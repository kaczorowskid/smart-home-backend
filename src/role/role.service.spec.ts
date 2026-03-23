import { PermissionType } from '@prisma/client';
import { Test, type TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { RoleService } from './role.service';

const mockRole = {
  id: 'role-1',
  name: 'admin',
  permissions: [
    { id: 'perm-1', roleId: 'role-1', permission: 'DEVICES_READ' },
    { id: 'perm-2', roleId: 'role-1', permission: 'DEVICES_WRITE' },
  ],
};

const mockDatabaseService = {
  role: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    jest.clearAllMocks();
  });

  describe('getAllPermissions', () => {
    it('should return all PermissionType enum values', async () => {
      const result = await service.getAllPermissions();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('deleteRole', () => {
    it('should delete role by id', async () => {
      mockDatabaseService.role.delete.mockResolvedValue(mockRole);

      const result = await service.deleteRole('role-1');

      expect(result).toEqual(mockRole);
      expect(mockDatabaseService.role.delete).toHaveBeenCalledWith({
        where: { id: 'role-1' },
      });
    });
  });

  describe('getAllRoles', () => {
    it('should return all roles with permissions', async () => {
      mockDatabaseService.role.findMany.mockResolvedValue([mockRole]);

      const result = await service.getAllRoles();

      expect(result).toEqual([mockRole]);
      expect(mockDatabaseService.role.findMany).toHaveBeenCalledWith({
        include: { permissions: true },
      });
    });
  });

  describe('getOneRole', () => {
    it('should return role with permissions by id', async () => {
      mockDatabaseService.role.findUnique.mockResolvedValue(mockRole);

      const result = await service.getOneRole('role-1');

      expect(result).toEqual(mockRole);
      expect(mockDatabaseService.role.findUnique).toHaveBeenCalledWith({
        where: { id: 'role-1' },
        include: { permissions: true },
      });
    });
  });

  describe('createRole', () => {
    it('should create role with mapped permissions', async () => {
      const dto = {
        name: 'editor',
        permissions: [
          PermissionType.DASHBOARD_VIEW,
          PermissionType.GRAPHS_VIEW,
        ],
      };
      mockDatabaseService.role.create.mockResolvedValue({
        id: 'role-2',
        ...dto,
      });

      const result = await service.createRole(dto);

      expect(result.id).toBe('role-2');
      expect(mockDatabaseService.role.create).toHaveBeenCalledWith({
        data: {
          name: 'editor',
          permissions: {
            create: [
              { permission: PermissionType.DASHBOARD_VIEW },
              { permission: PermissionType.GRAPHS_VIEW },
            ],
          },
        },
      });
    });
  });

  describe('updateRole', () => {
    it('should delete existing permissions and create new ones', async () => {
      const dto = {
        name: 'updated-role',
        permissions: [PermissionType.DASHBOARD_VIEW],
      };
      mockDatabaseService.role.update.mockResolvedValue({
        id: 'role-1',
        ...dto,
      });

      const result = await service.updateRole('role-1', dto);

      expect(result.name).toBe('updated-role');
      expect(mockDatabaseService.role.update).toHaveBeenCalledWith({
        where: { id: 'role-1' },
        data: {
          name: 'updated-role',
          permissions: {
            deleteMany: { roleId: 'role-1' },
            create: [{ permission: PermissionType.DASHBOARD_VIEW }],
          },
        },
      });
    });
  });
});
