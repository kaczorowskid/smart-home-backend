import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  accessTokenExpirationMs,
  refreshTokenExpirationMs,
} from 'src/constants/tokens-expiration.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(id: string) {
    return await this.userService.getOneUserById(id);
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

  async authUser(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setTime(
      expiresAccessToken.getTime() + accessTokenExpirationMs,
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setTime(
      expiresRefreshToken.getTime() + refreshTokenExpirationMs,
    );

    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: `${accessTokenExpirationMs}ms`,
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: `${refreshTokenExpirationMs}ms`,
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
      },
    );

    await this.userService.updateUser(user.id, {
      refreshToken: await hash(refreshToken, 10),
    });

    response.cookie('access-token', accessToken, {
      httpOnly: true,
      expires: expiresAccessToken,
      secure: this.configService.getOrThrow<string>('NODE_ENV') !== 'dev',
    });

    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      expires: expiresRefreshToken,
      secure: this.configService.getOrThrow<string>('NODE_ENV') !== 'dev',
    });
  }
}
