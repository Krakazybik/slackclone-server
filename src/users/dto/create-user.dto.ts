import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email should be string type' })
  @IsEmail({}, { message: 'Please use correct email' })
  @ApiProperty({ example: 'user@mail.cm', description: 'User e-mail address' })
  readonly email: string;

  @IsString({ message: 'Password should be string type' })
  @Length(4, 16, { message: 'Password length should be in range 4-16' })
  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  readonly password: string;
}
