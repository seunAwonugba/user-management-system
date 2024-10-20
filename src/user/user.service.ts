import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UNIQUE_EMAIL, USER_NOT_FOUND } from '../constant/constants';
import { hashData } from '../utils/hash';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.getUserByEmail(data.email);
    if (existingUser) {
      throw new ConflictException(UNIQUE_EMAIL);
    }
    const hashedPassword = await hashData(data.password);

    const createUser = this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return createUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async getUsers(): Promise<User[]> {
    const getUsers = await this.prismaService.user.findMany({
      include: {
        roles: true,
      },
    });
    const users = getUsers.map((item) => {
      delete item.password;
      return {
        ...item,
      };
    });

    return users;
  }
  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    const deleteUser = await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return deleteUser;
  }
}
