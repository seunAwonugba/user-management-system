import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constant/constants';
import { Role } from '../enum/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
