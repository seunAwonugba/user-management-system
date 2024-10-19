import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import {
  AUTH_PREFIX,
  LOGIN_URL,
  LOGOUT_URL,
  SIGNUP_URL,
} from '../constant/constants';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../utils/skip-auth';

@Controller(AUTH_PREFIX)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post(SIGNUP_URL)
  async signup(@Body() userDto: UserDto) {
    const signup = await this.authService.signup(userDto);
    return {
      success: true,
      data: signup,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Public()
  @Post(LOGIN_URL)
  async login(@Body() loginDto: LoginDto) {
    const login = await this.authService.login(loginDto);
    return {
      success: true,
      data: login,
      statusCode: HttpStatus.OK,
    };
  }

  @Public()
  @Get(LOGOUT_URL)
  async logout() {
    return {
      success: true,
      message: 'Successfully logged out 😏 🍀',
      data: {
        accessToken: '',
        refreshToken: '',
      },
    };
  }
}
