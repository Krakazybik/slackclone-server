import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Get all available roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('admin')
  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Get role by name' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @Get(':role')
  async getByRoleName(@Param('role') role) {
    return this.rolesService.getByRoleName(role);
  }

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @Post()
  async createRole(@Body() body: CreateRoleDto) {
    return this.rolesService.createRole(body);
  }
}
