import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ASSIGN_ROLE,
  USER_DELETE_SUCCESSFUL,
  USER_PREFIX,
  USERS_URL,
} from '../constant/constants';
import { Permissions } from '../decorator/permissions.decorator';
import { Resource } from '../enum/resource.enum';
import { Action } from '../enum/action.enum';
import { AuthorizationGuard } from '../guard/authorization.guard';
import { UserRoleService } from '../user_role/user_role.service';
import { AssignRoleDto } from './dto/assignRole.dto';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../guard/roles.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller(USER_PREFIX)
@ApiTags('users')
@ApiBearerAuth('JWT')
export class UserController {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
  ) {}

  /**
   * Get users
   */
  @UseGuards(RolesGuard)
  @Roles(Role.user)
  @Get(USERS_URL)
  async getUsers() {
    const users = await this.userService.getUsers();
    return {
      success: true,
      data: users,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Delete user
   */
  @Permissions([
    {
      resource: Resource.users,
      actions: [Action.delete],
    },
  ])
  @UseGuards(AuthorizationGuard)
  @Delete(`${USERS_URL}/:id`)
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(Number(id));

    return {
      success: true,
      message: USER_DELETE_SUCCESSFUL,
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Assign role to a user
   */
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Post(ASSIGN_ROLE)
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    const assignRole = await this.userRoleService.assignRole(assignRoleDto);

    return {
      success: true,
      data: assignRole,
      statusCode: HttpStatus.OK,
    };
  }
}
