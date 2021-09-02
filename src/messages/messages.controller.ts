import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewMessageDto } from './dto/new-message.dto';
import { MessagesService } from './messages.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './messages.model';
import { GetMessagesDto } from './dto/get-messages.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add new message' })
  @ApiResponse({ status: 200, type: Message })
  @Post()
  addNewMessage(@Body() dto: NewMessageDto) {
    return this.messageService.addNewMessage(dto);
  }

  @ApiOperation({ summary: 'Get all messages from channel with id' })
  @ApiResponse({ status: HttpStatus.OK, type: [GetMessagesDto] })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMessages(@Param('id') channelId: number) {
    const message = await this.messageService.getChannelMessages(channelId);
    return message;
  }
}
