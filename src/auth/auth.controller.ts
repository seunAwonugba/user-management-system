import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AUTH_PREFIX, SIGNUP_URL } from '../constant/constants';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller(AUTH_PREFIX)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(SIGNUP_URL)
  async signup(@Body() userDto: UserDto) {
    const signup = await this.authService.signup(userDto);
    return {
      success: true,
      data: signup,
      statusCode: HttpStatus.CREATED,
    };
  }
}
