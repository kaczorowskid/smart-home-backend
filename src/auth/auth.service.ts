import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { accessTokenExpiration } from 'src/constants/tokens-expiration.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getOneUserByEmail(email);
    const isPaswordOk = user && (await bcrypt.compare(password, user.password));

    if (!isPaswordOk) {
      return;
    }

    return user;
  }

  async loginUser(user: User) {
    return this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
        expiresIn: accessTokenExpiration,
      },
    );
  }

  async getUserById(id: string) {
    return await this.userService.getOneUserById(id);
  }
}
