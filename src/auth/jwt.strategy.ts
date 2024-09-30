import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

type JwtPayload = {
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies?.['auth-token'];

          if (!data) {
            throw new UnauthorizedException();
          }

          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return payload.email;
  }
}
