import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../role/interfaces/index.interface';
import { PERMISSIONS_KEY } from '../constant/constants';
import { UserService } from '../user/user.service';
import { hasRequiredPermissions } from '../utils/utils';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions: Permission[] = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    const getUserAdminPermissions =
      await this.userService.getUserAdminPermissions(request.user.id);

    if (getUserAdminPermissions.length == 0) {
      throw new ForbiddenException();
    }

    const hasResourceAndPermissions = hasRequiredPermissions(
      getUserAdminPermissions,
      requiredPermissions,
    );

    if (!hasResourceAndPermissions) {
      throw new ForbiddenException();
    }

    return true;
  }
}
