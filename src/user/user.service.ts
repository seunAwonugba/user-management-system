import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
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

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    return user;
  }

  async getUsers(): Promise<User[]> {
    const getUsers = await this.prismaService.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
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

  async getUserAdminPermissions(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const adminPermissions = user.roles
      .filter((item) => item.role.name === 'admin')
      .flatMap((item) => item.role.permissions);

    return adminPermissions;
  }
}
