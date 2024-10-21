import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token } from '../helper/tokens';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        Token,
        AccessTokenStrategy,
        RefreshTokenStrategy,
      ],
      imports: [UserModule, JwtModule, ConfigModule],
    }).compile();

    authService = module.get(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('auth controller', () => {
    it('should register a new user', async () => {
      const body = {
        firstName: 'seun',
        lastName: 'awonugba',
        email: 'seunawonugba@gmail.com',
        password: 'Chemistry500*',
      };
      const result = {
        success: true,
        data: {
          id: expect.any(String),
          password: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          createdAt: expect.any(Date), // Expect any date
          accessToken: expect.any(String), // Expect any string for token
          refreshToken: expect.any(String), // Expect any string for refresh token
        },
        statusCode: 201,
      };
      delete result.data.password;

      jest.spyOn(authService, 'signup').mockResolvedValue(result.data);
      expect(await authController.signup(body)).toEqual(result);
    });
    it('should login user', async () => {
      const body = {
        email: 'seunawonugba@gmail.com',
        password: 'Chemistry500*',
      };
      const result = {
        success: true,
        data: {
          id: expect.any(String),
          password: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          createdAt: expect.any(Date), // Expect any date
          accessToken: expect.any(String), // Expect any string for token
          refreshToken: expect.any(String), // Expect any string for refresh token
        },
        statusCode: 200,
      };
      delete result.data.password;

      jest.spyOn(authService, 'login').mockResolvedValue(result.data);
      expect(await authController.login(body)).toEqual(result);
    });
  });
});
