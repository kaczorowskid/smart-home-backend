import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { EmailService } from 'src/email/email.service';
import { CretaeUserByAdminDto } from './dto/create-user-by-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
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

    const hashedEmail = this.jwtService.sign({ email: user.email });

    this.emailService.sendMail(user.email, hashedEmail);

    return user;
  }

  async getUserByToken(token: string) {
    const { email } = this.jwtService.decode(token);

    return this.getOneUserByEmail(email);
  }

  async createAndVerifyUser(id: string, createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    return await this.databaseService.user.update({
      where: { id },
      data: {
        ...createUserDto,
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
