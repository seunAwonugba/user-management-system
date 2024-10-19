import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  VALID_EMAIL_REQUIRED,
} from '../../constant/constants';

export class LoginDto {
  @IsEmail({}, { message: VALID_EMAIL_REQUIRED })
  @IsNotEmpty({ message: EMAIL_REQUIRED })
  email: string;

  @IsNotEmpty({ message: PASSWORD_REQUIRED })
  password: string;
}
