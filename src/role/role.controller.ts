import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_PREFIX } from '../constant/constants';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';

@Controller(ROLE_PREFIX)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async createRole(@Body() roleDto: RoleDto) {
    const createRole = await this.roleService.createRole(roleDto);
    return createRole;
  }
}
