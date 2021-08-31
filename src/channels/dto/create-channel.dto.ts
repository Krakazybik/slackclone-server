import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ example: 'stories', description: 'Channel name' })
  @IsString({ message: 'Channel name should be a string type' })
  name: string;

  @IsString({ message: 'Password  should be a string type' })
  @ApiProperty({ example: 'qwerty123', description: 'Channel password' })
  password?: string;
}
