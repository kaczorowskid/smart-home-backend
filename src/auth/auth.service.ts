import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import {
  accessTokenExpirationMs,
  refreshTokenExpirationMs,
} from 'src/constants/tokens-expiration.constants';
import { Response } from 'express';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authUser(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() + accessTokenExpirationMs,
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() + refreshTokenExpirationMs,
    );

    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${accessTokenExpirationMs}ms`,
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${refreshTokenExpirationMs}ms`,
      },
    );

    await this.userService.updateUser(user.id, {
      refreshToken: await hash(refreshToken, 10),
    });

    response.cookie('access-token', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });

    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
    });
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getOneUserByEmail(email);
      const isPaswordOk = await bcrypt.compare(password, user.password);

      if (!isPaswordOk) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async validateUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.userService.getOneUserById(userId);
      const isTokenOk = await compare(refreshToken, user.refreshToken);

      if (!isTokenOk) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }

  async getUserById(id: string) {
    return await this.userService.getOneUserById(id);
  }
}
