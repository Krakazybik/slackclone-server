import { IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty({ example: '1', description: 'User identifier' })
  @IsNumber({}, { message: 'Message identifeir should be a number type' })
  id: number;

  @ApiProperty({ example: 'admin', description: 'User name' })
  @IsString({ message: 'Message user name should be string type' })
  name: string;

  @ApiProperty({ example: 'Hello', description: 'Message text' })
  @IsString({ message: 'Message text should be a string type' })
  @Length(1, 600, { message: 'Message text length should be in range 1-600' })
  message: string;

  @ApiProperty({ example: 'date', description: 'Creation date' })
  createdAt: string;
}
