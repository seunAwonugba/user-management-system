import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { PrismaService } from '../prisma/prisma.service';
import { ROLE_NOT_FOUND, USER_NOT_FOUND } from '../constant/constants';
import { UserRole } from '../user/interfaces/user.interface';

@Injectable()
export class UserRoleService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private prismaService: PrismaService,
  ) {}

  async assignRole(userRole: UserRole) {
    const userId = Number(userRole.userId);
    const roleId = Number(userRole.roleId);

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const role = await this.roleService.getRoleById(roleId);

    if (!role) {
      throw new NotFoundException(ROLE_NOT_FOUND);
    }

    const assignRole = await this.prismaService.userRole.create({
      data: {
        userId: user.id,
        roleId: role.id,
      },
    });

    return assignRole;
  }
}
