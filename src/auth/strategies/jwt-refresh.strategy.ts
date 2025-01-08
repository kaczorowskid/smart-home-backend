import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      passReqToCallback: true,
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies?.['refresh-token'];

          if (!data) {
            throw new UnauthorizedException();
          }

          return data;
        },
      ]),
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    return this.authService.validateUserRefreshToken(
      request.cookies?.['refresh-token'],
      payload.id,
    );
  }
}
