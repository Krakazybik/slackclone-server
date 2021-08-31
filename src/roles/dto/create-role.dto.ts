import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Role name' })
  role: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  description: string;
}
