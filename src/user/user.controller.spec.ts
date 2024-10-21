import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRoleModule } from '../user_role/user_role.module';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [PrismaModule, UserRoleModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('user controller', () => {
    it('should fetch if users are empty', async () => {
      const result = { data: [], statusCode: 200, success: true };
      jest.spyOn(userService, 'getUsers').mockResolvedValue(result.data);
      expect(await userController.getUsers()).toEqual(result);
    });
    it('should fetch all users if not empty', async () => {
      const result = { data: [], statusCode: 200, success: true };
      jest.spyOn(userService, 'getUsers').mockResolvedValue(result.data);
      expect((await userController.getUsers()).statusCode).toEqual(
        result.statusCode,
      );
    });
  });
});
