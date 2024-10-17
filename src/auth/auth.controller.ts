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
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.loginUser(loginUserDto);
    const { password, ...user } = req.user;

    res.cookie('auth-token', token, {
      httpOnly: true,
      maxAge: 600000000,
    });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/authorize')
  async getUser(@Req() req: Request & { user: string }) {
    return await this.authService.getUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-token');

    return { result: true };
  }
}
