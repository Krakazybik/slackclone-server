import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty({ example: 'stories', description: 'Channel name' })
  name: string;

  @ApiProperty({ example: 'qwerty123', description: 'Channel password' })
  password?: string;
}
