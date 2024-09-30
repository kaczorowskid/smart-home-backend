import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';

export class CretaeUserByAdminDto extends PickType(RegisterUserDto, [
  'email',
  'role',
]) {}
