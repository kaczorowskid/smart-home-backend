import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdminRoute = this.reflector.getAllAndOverride<boolean>('isAdmin', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAdminRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Required ADMIN role');
    }

    return true;
  }
}
