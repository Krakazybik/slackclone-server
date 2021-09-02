import { IsNumber, IsString } from 'class-validator';

export class NewMessageDto {
  @IsNumber({}, { message: 'User id should be a number' })
  readonly userId: number;

  @IsString({ message: 'User Name should be a string' })
  readonly userName: string;

  @IsNumber({}, { message: 'Channel id should be a number' })
  readonly channelId: number;

  @IsString({ message: 'Message  should be a string' })
  readonly message: string;
}
