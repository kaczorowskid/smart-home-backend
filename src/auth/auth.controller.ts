import { Response } from 'express';
import { User } from '@prisma/client';
import { Get, Res, Body, Post, UseGuards, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token').clearCookie('refresh-token');

    return { result: true };
  }

  @Get('/authorize')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...restUser } = user;

    return restUser;
  }

  @Get('/refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshUser(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.authUser(user, res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...restUser } = user;

    return restUser;
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: User,
  ) {
    await this.authService.authUser(user, res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...restUser } = user;

    return restUser;
  }
}
