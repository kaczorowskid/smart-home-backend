import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getOneUser(email);
    const isPaswordOk = user && (await bcrypt.compare(password, user.password));

    if (!isPaswordOk) {
      return;
    }

    return user;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    return this.jwtService.sign({ email: loginUserDto.email });
  }

  async getUser(email: string) {
    return await this.userService.getOneUser(email);
  }
}
