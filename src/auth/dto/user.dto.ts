import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import {
  EMAIL_REQUIRED,
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  PASSWORD_REQUIRED,
  STRONG_PASSWORD_REQUIRED,
  VALID_EMAIL_REQUIRED,
} from '../../constant/constants';

export class UserDto {
  @IsNotEmpty({ message: FIRST_NAME_REQUIRED })
  firstName: string;

  @IsNotEmpty({ message: LAST_NAME_REQUIRED })
  lastName: string;

  @IsEmail({}, { message: VALID_EMAIL_REQUIRED })
  @IsNotEmpty({ message: EMAIL_REQUIRED })
  email: string;

  @IsStrongPassword({}, { message: STRONG_PASSWORD_REQUIRED })
  @IsNotEmpty({ message: PASSWORD_REQUIRED })
  password: string;
}
