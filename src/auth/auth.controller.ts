import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: User,
  ) {
    const token = await this.authService.loginUser(user);
    const { password, ...restUser } = user;

    res.cookie('auth-token', token, {
      httpOnly: true,
      maxAge: 600000000,
    });

    return restUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/authorize')
  async getUser(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-token');

    return { result: true };
  }
}
