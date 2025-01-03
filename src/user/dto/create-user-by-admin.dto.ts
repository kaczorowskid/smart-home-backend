import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class CretaeUserByAdminDto extends PickType(CreateUserDto, [
  'email',
  'roleId',
]) {}
