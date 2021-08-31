import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsNumber({}, { message: 'User identifier should be a number' })
  @ApiProperty({ example: '1', description: 'User identifier' })
  readonly userId: number;

  @IsString({ message: 'User role should be a string type' })
  @ApiProperty({ example: 'admin', description: 'User role' })
  readonly role: string;
}
