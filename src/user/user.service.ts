import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { EmailService } from 'src/email/email.service';
import { CretaeUserByAdminDto } from './dto/create-user-by-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { userCreateTokenExpiration } from 'src/constants/tokens-expiration.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers() {
    return await this.databaseService.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getOneUserByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async getOneUserById(id: string) {
    return await this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async createUserByAdmin(createUserByAdminDto: CretaeUserByAdminDto) {
    const user = await this.databaseService.user.create({
      data: {
        name: '',
        password: '',
        surname: '',
        isVerified: false,
        email: createUserByAdminDto.email,
        role: createUserByAdminDto.role,
      },
    });

    const hashedEmail = this.jwtService.sign(
      { email: user.email },
      {
        secret: this.configService.getOrThrow<string>('JWT_USER_CRETE_SECRET'),
        expiresIn: userCreateTokenExpiration,
      },
    );

    this.emailService.sendMail(user.email, hashedEmail);

    return user;
  }

  async getUserByToken(token: string) {
    const { email } = this.jwtService.decode(token);

    return this.getOneUserByEmail(email);
  }

  async verifyUser(id: string, udpateUserDto: UpdateUserDto) {
    const passwordHash = await bcrypt.hash(udpateUserDto.password, 10);

    return await this.databaseService.user.update({
      where: { id },
      data: {
        ...udpateUserDto,
        password: passwordHash,
        isVerified: true,
      },
    });
  }

  async deleteUser(id: string) {
    return await this.databaseService.user.delete({
      where: { id },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
