import { IsNotEmpty, ValidateNested } from 'class-validator';
import { PermissionDto } from './permission.dto';
import { Type } from 'class-transformer';

export class RoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
