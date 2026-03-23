import { Reflector } from '@nestjs/core';
import { Test, type TestingModule } from '@nestjs/testing';
import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';

const createMockExecutionContext = (user?: any): ExecutionContext =>
  ({
    getClass: jest.fn(),
    getHandler: jest.fn(),
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  }) as any;

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsGuard,
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get<PermissionsGuard>(PermissionsGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should allow access when no permissions are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const context = createMockExecutionContext();

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access when required permissions list is empty', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);
    const context = createMockExecutionContext();

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access when user has required permission', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['DEVICES_READ']);

    const user = {
      role: {
        permissions: [
          { permission: 'DEVICES_READ' },
          { permission: 'DEVICES_WRITE' },
        ],
      },
    };
    const context = createMockExecutionContext(user);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access when user has at least one of required permissions', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['DEVICES_READ', 'ADMIN']);

    const user = {
      role: {
        permissions: [{ permission: 'ADMIN' }],
      },
    };
    const context = createMockExecutionContext(user);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException when user lacks required permissions', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);

    const user = {
      role: {
        permissions: [{ permission: 'DEVICES_READ' }],
      },
    };
    const context = createMockExecutionContext(user);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when user has no permissions', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['DEVICES_READ']);

    const user = {
      role: {
        permissions: [],
      },
    };
    const context = createMockExecutionContext(user);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when permissions are undefined', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['DEVICES_READ']);

    const user = {
      role: {
        permissions: undefined,
      },
    };
    const context = createMockExecutionContext(user);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
