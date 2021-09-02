import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewMessageDto } from './dto/new-message.dto';
import { MessagesService } from './messages.service';
import { GetMessagesDto } from './dto/get-messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addNewMessage(@Body() dto: NewMessageDto) {
    return this.messageService.addNewMessage(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMessages(@Param('id') channelId: number) {
    const message = await this.messageService.getChannelMessages(channelId);
    return message;
  }
}
