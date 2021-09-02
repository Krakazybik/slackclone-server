import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email should be string type' })
  @Length(4, 32, { message: 'Login length should be in range 4-32' })
  @ApiProperty({ example: 'user@mail.cm', description: 'User e-mail address' })
  readonly email: string;

  @IsString({ message: 'Password should be string type' })
  @Length(4, 32, { message: 'Password length should be in range 4-32' })
  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  readonly password: string;
}
