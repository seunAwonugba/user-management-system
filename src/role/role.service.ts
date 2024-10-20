import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}
  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    const createRole = await this.prismaService.role.create({
      data,
    });

    return createRole;
  }

  async getRoleById(id: number) {
    const role = await this.prismaService.role.findFirst({
      where: {
        id,
      },
    });
    return role;
  }
}
