import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewMessageDto } from './dto/new-message.dto';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messagesRepository: typeof Message,
  ) {}

  async addNewMessage(dto: NewMessageDto) {
    return await this.messagesRepository.create(dto);
  }
}
