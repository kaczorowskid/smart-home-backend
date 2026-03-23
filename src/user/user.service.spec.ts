import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { Test, type TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from './user.service';

jest.mock('bcrypt');

const mockUser = {
  id: 'user-1',
  name: 'John',
  surname: 'Doe',
  isVerified: true,
  roleId: 'role-1',
  refreshToken: null,
  email: 'john@example.com',
  password: 'hashed-password',
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  role: {
    id: 'role-1',
    name: 'user',
    permissions: [{ permission: 'DEVICES_READ' }],
  },
};

const mockDatabaseService = {
  role: {
    findMany: jest.fn(),
  },
  user: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn(),
  decode: jest.fn(),
};

const mockConfigService = {
  getOrThrow: jest.fn(),
};

const mockEmailService = {
  sendMail: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      mockDatabaseService.user.delete.mockResolvedValue(mockUser);

      const result = await service.deleteUser('user-1');

      expect(result).toEqual(mockUser);
      expect(mockDatabaseService.user.delete).toHaveBeenCalledWith({
        where: { id: 'user-1' },
      });
    });
  });

  describe('getUserByToken', () => {
    it('should decode token and return user by email', async () => {
      mockJwtService.decode.mockReturnValue({ email: 'john@example.com' });
      mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.getUserByToken('some-jwt-token');

      expect(mockJwtService.decode).toHaveBeenCalledWith('some-jwt-token');
      expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
        include: { role: { include: { permissions: true } } },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAllRoles', () => {
    it('should return all roles with permissions', async () => {
      const roles = [{ id: 'role-1', name: 'admin', permissions: [] }];
      mockDatabaseService.role.findMany.mockResolvedValue(roles);

      const result = await service.getAllRoles();

      expect(result).toEqual(roles);
      expect(mockDatabaseService.role.findMany).toHaveBeenCalledWith({
        include: { permissions: true },
      });
    });
  });

  describe('updateUser', () => {
    it('should update user with provided data', async () => {
      const dto = { name: 'Jane' };
      mockDatabaseService.user.update.mockResolvedValue({
        ...mockUser,
        name: 'Jane',
      });

      const result = await service.updateUser('user-1', dto);

      expect(result.name).toBe('Jane');
      expect(mockDatabaseService.user.update).toHaveBeenCalledWith({
        data: dto,
        where: { id: 'user-1' },
      });
    });
  });

  describe('getOneUserById', () => {
    it('should return user with role and permissions', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.getOneUserById('user-1');

      expect(result).toEqual(mockUser);
      expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        include: { role: { include: { permissions: true } } },
      });
    });
  });

  describe('getOneUserByEmail', () => {
    it('should return user by email with role and permissions', async () => {
      mockDatabaseService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.getOneUserByEmail('john@example.com');

      expect(result).toEqual(mockUser);
      expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
        include: { role: { include: { permissions: true } } },
      });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users ordered by createdAt asc', async () => {
      mockDatabaseService.user.findMany.mockResolvedValue([mockUser]);

      const result = await service.getAllUsers();

      expect(result).toEqual([mockUser]);
      expect(mockDatabaseService.user.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'asc' },
        include: { role: { include: { permissions: true } } },
      });
    });
  });

  describe('verifyUser', () => {
    it('should hash password and set isVerified to true', async () => {
      const dto = { name: 'John', surname: 'Doe', password: 'NewPass1!' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hashed-password');
      mockDatabaseService.user.update.mockResolvedValue({
        ...mockUser,
        isVerified: true,
        password: 'new-hashed-password',
      });

      const result = await service.verifyUser('user-1', dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('NewPass1!', 10);
      expect(mockDatabaseService.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: {
          ...dto,
          isVerified: true,
          password: 'new-hashed-password',
        },
      });
      expect(result.isVerified).toBe(true);
    });
  });

  describe('createUserByAdmin', () => {
    it('should create user, sign token, and send email', async () => {
      const dto = { roleId: 'role-1', email: 'new@example.com' };
      const createdUser = {
        ...mockUser,
        name: '',
        surname: '',
        id: 'user-2',
        password: '',
        isVerified: false,
        email: 'new@example.com',
      };
      mockDatabaseService.user.create.mockResolvedValue(createdUser);
      mockJwtService.sign.mockReturnValue('hashed-email-token');
      mockConfigService.getOrThrow.mockReturnValue('jwt-secret');

      const result = await service.createUserByAdmin(dto);

      expect(mockDatabaseService.user.create).toHaveBeenCalledWith({
        data: {
          name: '',
          surname: '',
          password: '',
          roleId: 'role-1',
          isVerified: false,
          email: 'new@example.com',
        },
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { email: 'new@example.com' },
        expect.objectContaining({
          expiresIn: '2d',
          secret: 'jwt-secret',
        }),
      );
      expect(mockEmailService.sendMail).toHaveBeenCalledWith(
        'new@example.com',
        'hashed-email-token',
      );
      expect(result).toEqual(createdUser);
    });
  });
});
