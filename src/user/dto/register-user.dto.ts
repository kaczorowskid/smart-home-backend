import { $Enums, Prisma } from '@prisma/client';

export class RegisterUserDto implements Prisma.UserCreateInput {
  name: string;
  surname: string;
  email: string;
  password: string;
  isVerified?: boolean;
  role?: $Enums.UserRole;
}
