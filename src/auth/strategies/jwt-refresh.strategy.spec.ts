import { ConfigService } from '@nestjs/config';
import { Test, type TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

const mockUser = {
  name: 'John',
  id: 'user-id-1',
  email: 'test@example.com',
};

const mockAuthService = {
  validateUserRefreshToken: jest.fn(),
};

const mockConfigService = {
  getOrThrow: jest.fn().mockReturnValue('test-refresh-secret'),
};

describe('JwtRefreshStrategy', () => {
  let strategy: JwtRefreshStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtRefreshStrategy,
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    strategy = module.get<JwtRefreshStrategy>(JwtRefreshStrategy);
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should return user when refresh token is valid', async () => {
      mockAuthService.validateUserRefreshToken.mockResolvedValue(mockUser);

      const mockRequest = {
        cookies: { 'refresh-token': 'valid-refresh-token' },
      } as any;
      const payload = { iat: 123, exp: 456, id: 'user-id-1' };

      const result = await strategy.validate(mockRequest, payload);

      expect(result).toEqual(mockUser);
      expect(mockAuthService.validateUserRefreshToken).toHaveBeenCalledWith(
        'valid-refresh-token',
        'user-id-1',
      );
    });
  });
});
