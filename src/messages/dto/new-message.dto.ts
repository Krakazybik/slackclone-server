import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewMessageDto {
  @ApiProperty({ example: '1', description: 'User identifier' })
  @IsNumber({}, { message: 'User id should be a number' })
  readonly userId: number;

  @ApiProperty({ example: 'admin', description: 'User name' })
  @IsString({ message: 'User Name should be a string' })
  readonly userName: string;

  @ApiProperty({ example: '1', description: 'Channel identifier' })
  @IsNumber({}, { message: 'Channel id should be a number' })
  readonly channelId: number;

  @ApiProperty({ example: 'Hello', description: 'Message text' })
  @IsString({ message: 'Message  should be a string' })
  readonly message: string;
}
