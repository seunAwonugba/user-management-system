import { SetMetadata } from '@nestjs/common';
import { Role } from '../role/interfaces/index.interface';
import { ROLES_KEY } from '../constant/constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
