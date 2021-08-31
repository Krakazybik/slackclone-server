import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from '../../messages/messages.service';
import { NewMessageDto } from '../../messages/dto/new-message.dto';
import { UsePipes } from '@nestjs/common';
import { SocketValidationPipe } from '../../pipes/socket-validation.pipe';

@WebSocketGateway()
export class ChannelGateway {
  constructor(private messagesService: MessagesService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connect')
  handleConnect(@MessageBody() data: string) {}

  @SubscribeMessage('createChannel')
  handleCreateChannel(@MessageBody() data: string) {}

  @UsePipes(SocketValidationPipe)
  @SubscribeMessage('newMessage')
  async handleNewMessage(@MessageBody() data: NewMessageDto) {
    return await this.messagesService.addNewMessage(data);
  }

  @SubscribeMessage('newChannel')
  handleNewChannel(@MessageBody() data: string) {}

  @SubscribeMessage('renameChannel')
  handleRenameChannel(@MessageBody() data: string) {}

  @SubscribeMessage('removeChannel')
  handleRemoveChannel(@MessageBody() data: string) {}
}
