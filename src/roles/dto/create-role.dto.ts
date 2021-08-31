import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Role should be string type' })
  @Length(2, 32)
  @ApiProperty({ example: 'admin', description: 'Role name' })
  role: string;

  @Length(3, 120)
  @IsString({ message: 'Description should be string type' })
  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  description: string;
}
