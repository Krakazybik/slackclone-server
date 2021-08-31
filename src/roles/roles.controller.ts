import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':role')
  async getByRoleName(@Param('role') role) {
    return this.rolesService.getByRoleName(role);
  }

  @Post()
  async createRole(@Body() body: CreateRoleDto) {
    return this.rolesService.createRole(body);
  }
}
