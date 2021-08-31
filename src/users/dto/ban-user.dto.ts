import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'User id' })
  @IsNumber({}, { message: 'User Id should be a number' })
  readonly userId: number;

  @IsString({ message: 'Reson should be string type' })
  @ApiProperty({ example: 'Cheats', description: 'User ban reason' })
  readonly reason: string;
}
