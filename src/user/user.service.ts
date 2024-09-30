import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { EmailService } from 'src/email/email.service';
import { CretaeUserByAdminDto } from './dto/create-user-by-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

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

  async getOneUser(email: string) {
    return await this.databaseService.user.findUnique({
      where: { email },
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

    return this.getOneUser(email);
  }

  async registerAndVerifyUser(id: string, registerUserDto: RegisterUserDto) {
    const passwordHash = await bcrypt.hash(registerUserDto.password, 10);

    return await this.databaseService.user.update({
      where: { id },
      data: {
        ...registerUserDto,
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
}
