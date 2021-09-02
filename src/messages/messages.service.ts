import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewMessageDto } from './dto/new-message.dto';
import { Message } from './messages.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messagesRepository: typeof Message,
  ) {}

  async addNewMessage(dto: NewMessageDto) {
    return await this.messagesRepository.create(dto);
  }

  async getChannelMessages(channelId: number) {
    const messages = await this.messagesRepository.findAll({
      where: { channelId },
    });

    if (messages) return messages;

    throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
  }
}
