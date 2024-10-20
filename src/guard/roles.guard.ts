import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constant/constants';
import { Role } from '../enum/role.enum';
import { UserService } from '../user/user.service';
import { checkUserRoles } from '../utils/utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request);

    const userId = request.user.id;

    const getUser = await this.userService.getUserById(userId);
    const userRoles = getUser.roles;

    const hasRequiredRoles = checkUserRoles(userRoles, requiredRoles);

    if (!hasRequiredRoles) {
      throw new ForbiddenException();
    }

    return true;
  }
}
