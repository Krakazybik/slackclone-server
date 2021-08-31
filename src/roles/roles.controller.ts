import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Roles('admin')
  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Roles('admin')
  @Get(':role')
  async getByRoleName(@Param('role') role) {
    return this.rolesService.getByRoleName(role);
  }

  @Roles('admin')
  @Post()
  async createRole(@Body() body: CreateRoleDto) {
    return this.rolesService.createRole(body);
  }
}
