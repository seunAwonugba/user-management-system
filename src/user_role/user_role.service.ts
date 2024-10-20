import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  ROLE_NOT_FOUND,
  ROLE_PREVIOUSLY_ASSIGNED,
  USER_NOT_FOUND,
} from '../constant/constants';
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

    const userRolePayload = {
      userId: user.id,
      roleId: role.id,
    };

    const getUserRole = await this.getUserRole(userRolePayload);

    if (getUserRole) {
      throw new BadRequestException(ROLE_PREVIOUSLY_ASSIGNED);
    }

    const assignRole = await this.prismaService.userRole.create({
      data: {
        userId: user.id,
        roleId: role.id,
      },
    });

    return assignRole;
  }

  async getUserRole(payload: any) {
    const userId = payload.userId;
    const roleId = payload.roleId;

    const getUserRole = await this.prismaService.userRole.findFirst({
      where: {
        userId,
        roleId,
      },
    });

    return getUserRole;
  }
}
