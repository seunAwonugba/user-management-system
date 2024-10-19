import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';
import { Token } from '../helper/tokens';
import { Login } from './interfaces/login.interface';
import { INCORRECT_CREDENTIALS } from '../constant/constants';
import { compareHash } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private token: Token,
  ) {}

  async signup(user: User) {
    const createUser = await this.userService.createUser(user);
    delete createUser.password;

    const tokenPayload = {
      id: createUser.id,
      email: createUser.email,
    };

    const tokens = await this.token.generateTokens(tokenPayload);

    return {
      ...createUser,
      ...tokens,
    };
  }

  async login(login: Login) {
    const email = login.email;
    const password = login.password;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    const passwordPayload = {
      value: password,
      hash: user.password,
    };

    const comparePasswords = await compareHash(passwordPayload);

    if (!comparePasswords) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    delete user.password;

    const tokenPayload = {
      id: user.id,
      email: user.email,
    };
    const tokens = await this.token.generateTokens(tokenPayload);

    return {
      ...user,
      ...tokens,
    };
  }
}
