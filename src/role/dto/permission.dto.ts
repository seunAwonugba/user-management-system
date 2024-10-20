import { ArrayUnique, IsEnum } from 'class-validator';
import { Resource } from '../../enum/resource.enum';
import { Action } from '../../enum/action.enum';

export class PermissionDto {
  @IsEnum(Resource)
  resource: Resource;

  @IsEnum(Action, { each: true })
  @ArrayUnique()
  actions: Action[];
}
