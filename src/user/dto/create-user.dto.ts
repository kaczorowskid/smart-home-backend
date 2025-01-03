import { Prisma } from '@prisma/client';
import { IsBoolean, IsEmail, IsJWT, IsUUID } from 'class-validator';
import {
  IsName,
  IsPassword,
} from 'src/common/validations/validations.decorators';

export class CreateUserDto implements Omit<Prisma.UserCreateInput, 'role'> {
  @IsName()
  name: string;

  @IsName()
  surname: string;

  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsBoolean()
  isVerified?: boolean;

  @IsUUID()
  roleId: string;

  @IsJWT()
  refreshToken?: string;
}
