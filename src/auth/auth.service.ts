import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';
import { Token } from '../helper/tokens';

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
}
