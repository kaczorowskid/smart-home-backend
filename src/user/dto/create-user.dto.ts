import { $Enums, Prisma } from '@prisma/client';
import { IsBoolean, IsEmail, IsEnum, IsJWT } from 'class-validator';
import {
  IsName,
  IsPassword,
} from 'src/common/validations/validations.decorators';

export class CreateUserDto implements Prisma.UserCreateInput {
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

  @IsEnum($Enums.UserRole)
  role?: $Enums.UserRole;

  @IsJWT()
  refreshToken?: string;
}
