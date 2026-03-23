import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { DatabaseService } from 'src/database/database.service';
import { userCreateTokenExpiration } from 'src/constants/tokens-expiration.constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async deleteUser(id: string) {
    return await this.databaseService.user.delete({
      where: { id },
    });
  }

  async getUserByToken(token: string) {
    const { email } = this.jwtService.verify(token);

    return this.getOneUserByEmail(email);
  }

  async getAllRoles() {
    return await this.databaseService.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async getOneUserById(id: string) {
    return await this.databaseService.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async getOneUserByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async getAllUsers() {
    return await this.databaseService.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async verifyUser(id: string, updateUserDto: UpdateUserDto) {
    const passwordHash = await bcrypt.hash(updateUserDto.password, 10);

    return await this.databaseService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        isVerified: true,
        password: passwordHash,
      },
    });
  }

  async createUserByAdmin(createUserByAdminDto: CreateUserByAdminDto) {
    const user = await this.databaseService.user.create({
      data: {
        name: '',
        surname: '',
        password: '',
        isVerified: false,
        email: createUserByAdminDto.email,
        roleId: createUserByAdminDto.roleId,
      },
    });

    const hashedEmail = this.jwtService.sign(
      { email: user.email },
      {
        expiresIn: userCreateTokenExpiration,
        secret: this.configService.getOrThrow<string>('JWT_USER_CREATE_SECRET'),
      },
    );

    this.emailService.sendMail(user.email, hashedEmail);

    return user;
  }
}
