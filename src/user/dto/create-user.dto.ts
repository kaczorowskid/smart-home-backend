import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  name: string;
  surname: string;
  email: string;
  password: string;
}
