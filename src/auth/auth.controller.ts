import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

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
    await this.authService.authUser(user, res);
    const { password, refreshToken, ...restUser } = user;

    return restUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/authorize')
  async getUser(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    return user;
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refresh')
  async refreshUser(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.authUser(user, res);
    const { password, refreshToken, ...restUser } = user;

    return restUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token').clearCookie('refresh-token');

    return { result: true };
  }
}
