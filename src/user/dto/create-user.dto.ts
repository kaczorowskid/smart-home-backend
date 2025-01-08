import { Prisma } from '@prisma/client';
import { IsJWT, IsUUID, IsEmail, IsBoolean } from 'class-validator';
import {
  IsName,
  IsPassword,
} from 'src/common/validations/validations.decorators';

export class CreateUserDto implements Omit<Prisma.UserCreateInput, 'role'> {
  @IsName()
  name: string;

  @IsEmail()
  email: string;

  @IsUUID()
  roleId: string;

  @IsName()
  surname: string;

  @IsPassword()
  password: string;

  @IsJWT()
  refreshToken?: string;

  @IsBoolean()
  isVerified?: boolean;
}
