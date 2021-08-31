import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewMessageDto } from './dto/new-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addNewMessage(@Body() dto: NewMessageDto) {
    this.messageService.addNewMessage(dto);
  }
}
