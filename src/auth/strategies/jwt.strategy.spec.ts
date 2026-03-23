import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../auth.service';

const mockUser = {
  name: 'John',
  id: 'user-id-1',
  email: 'test@example.com',
};

const mockAuthService = {
  getUserById: jest.fn(),
};

const mockConfigService = {
  getOrThrow: jest.fn().mockReturnValue('test-jwt-secret'),
};

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should return user when payload is valid', async () => {
      mockAuthService.getUserById.mockResolvedValue(mockUser);

      const payload = { iat: 123, exp: 456, id: 'user-id-1' };
      const result = await strategy.validate(payload);

      expect(result).toEqual(mockUser);
      expect(mockAuthService.getUserById).toHaveBeenCalledWith('user-id-1');
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      mockAuthService.getUserById.mockResolvedValue(null);

      const payload = { iat: 123, exp: 456, id: 'nonexistent-id' };

      await expect(strategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
