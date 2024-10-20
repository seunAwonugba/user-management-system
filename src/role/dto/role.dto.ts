import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  permissions: any;
}
