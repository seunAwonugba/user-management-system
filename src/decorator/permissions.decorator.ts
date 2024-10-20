import { SetMetadata } from '@nestjs/common';
import { Permission } from '../role/interfaces/index.interface';
import { PERMISSIONS_KEY } from '../constant/constants';

export const Permissions = (permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
