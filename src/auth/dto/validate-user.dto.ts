import { IsEmail } from 'class-validator';
import { IsPassword } from 'src/common/validations/validations.decorators';

export class ValidateUserDto {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;
}
