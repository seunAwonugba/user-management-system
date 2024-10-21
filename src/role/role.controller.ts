import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ROLE_PREFIX } from '../constant/constants';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller(ROLE_PREFIX)
@ApiTags('role')
@ApiBearerAuth('JWT')
export class RoleController {
  constructor(private roleService: RoleService) {}

  /**
   * Create role
   */
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Post()
  async createRole(@Body() roleDto: RoleDto) {
    const createRole = await this.roleService.createRole(roleDto);
    return {
      success: true,
      data: createRole,
      statusCode: HttpStatus.CREATED,
    };
  }
}
