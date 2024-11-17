import { IsEmail } from 'class-validator';
import { IsPassword } from 'src/common/validations/validations.decorators';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;
}
