import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UNIQUE_EMAIL } from '../constant/constants';
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
}
