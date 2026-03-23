import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

const mockUser = {
  name: 'John',
  surname: 'Doe',
  id: 'user-id-1',
  isVerified: true,
  roleId: 'role-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test@example.com',
  password: 'hashed-password',
  refreshToken: 'hashed-refresh-token',
};

const mockUserService = {
  updateUser: jest.fn(),
  getOneUserById: jest.fn(),
  getOneUserByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockConfigService = {
  getOrThrow: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user from userService', async () => {
      mockUserService.getOneUserById.mockResolvedValue(mockUser);

      const result = await authService.getUserById('user-id-1');

      expect(result).toEqual(mockUser);
      expect(mockUserService.getOneUserById).toHaveBeenCalledWith('user-id-1');
    });
  });

  describe('validateUser', () => {
    it('should return user when credentials are valid', async () => {
      mockUserService.getOneUserByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual(mockUser);
      expect(mockUserService.getOneUserByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashed-password',
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      mockUserService.getOneUserByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.validateUser('test@example.com', 'wrong-password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      mockUserService.getOneUserByEmail.mockRejectedValue(
        new Error('Not found'),
      );

      await expect(
        authService.validateUser('unknown@example.com', 'password123'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUserRefreshToken', () => {
    it('should return user when refresh token is valid', async () => {
      mockUserService.getOneUserById.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUserRefreshToken(
        'valid-refresh-token',
        'user-id-1',
      );

      expect(result).toEqual(mockUser);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'valid-refresh-token',
        'hashed-refresh-token',
      );
    });

    it('should throw UnauthorizedException when refresh token is invalid', async () => {
      mockUserService.getOneUserById.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.validateUserRefreshToken(
          'invalid-refresh-token',
          'user-id-1',
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      mockUserService.getOneUserById.mockRejectedValue(new Error('Not found'));

      await expect(
        authService.validateUserRefreshToken('token', 'unknown-id'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('authUser', () => {
    const mockResponse = {
      cookie: jest.fn().mockReturnThis(),
    } as any;

    beforeEach(() => {
      mockJwtService.sign.mockReturnValueOnce('access-token-value');
      mockJwtService.sign.mockReturnValueOnce('refresh-token-value');
      mockConfigService.getOrThrow.mockReturnValue('dev');
      mockUserService.updateUser.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-new-refresh-token');
    });

    it('should generate access and refresh tokens', async () => {
      await authService.authUser(mockUser as any, mockResponse);

      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { id: 'user-id-1' },
        expect.objectContaining({
          secret: 'dev',
        }),
      );
    });

    it('should hash and store refresh token', async () => {
      await authService.authUser(mockUser as any, mockResponse);

      expect(bcrypt.hash).toHaveBeenCalledWith('refresh-token-value', 10);
      expect(mockUserService.updateUser).toHaveBeenCalledWith('user-id-1', {
        refreshToken: 'hashed-new-refresh-token',
      });
    });

    it('should set access-token and refresh-token cookies', async () => {
      await authService.authUser(mockUser as any, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledTimes(2);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access-token',
        'access-token-value',
        expect.objectContaining({
          secure: false,
          httpOnly: true,
        }),
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh-token',
        'refresh-token-value',
        expect.objectContaining({
          secure: false,
          httpOnly: true,
        }),
      );
    });

    it('should set secure cookies in production', async () => {
      mockConfigService.getOrThrow.mockReturnValue('production');

      await authService.authUser(mockUser as any, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access-token',
        'access-token-value',
        expect.objectContaining({
          secure: true,
        }),
      );
    });
  });
});
