import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.cm', description: 'User e-mail address' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  readonly password: string;
}
