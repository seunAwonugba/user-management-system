import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UNIQUE_EMAIL } from '../constant/constants';
import { hashPassword } from '../utils/hash';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw new ConflictException(UNIQUE_EMAIL);
    }
    const hashedPassword = await hashPassword(data.password);

    const createUser = this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return createUser;
  }
}
