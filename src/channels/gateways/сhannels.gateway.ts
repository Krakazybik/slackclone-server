import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from '../../messages/dto/new-message.dto';
import {
  HttpStatus,
  Logger,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { SocketValidationPipe } from '../../pipes/socket-validation.pipe';
import { SocketAuthGuard } from 'src/guards/socket-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { Message } from '../../messages/messages.model';
import { MessagesService } from '../../messages/messages.service';

interface IAuthorizedClient {
  socketId: string;
  userId: number;
  userName: string;
}

@WebSocketGateway({
  cors: { origin: '*' },
  cookie: 'sid',
})
export class ChannelGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private messagesService: MessagesService,
  ) {}

  private authorizedClients: Array<IAuthorizedClient> = [];
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  async handleConnection(client: Socket, ...args: any[]) {
    const authHeader = client.handshake.headers.authorization;

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer === 'Bearer' && token) {
      const user = this.jwtService.verify(token);
      if (user) {
        const banned = await this.authService.isBanned(user.id);
        if (!banned) {
          this.authorizedClients.push({
            socketId: client.id,
            userId: user.id,
            userName: user.email,
          });
          return { status: HttpStatus.OK };
        }
      }
    }
    this.logger.log(`Wrong auth data! Disconnected! : ${authHeader}`);
    client.disconnect();
  }

  handleDisconnect(client: Socket) {
    this.authorizedClients = this.authorizedClients.filter(
      (authClient) => authClient.socketId !== client.id,
    );
  }

  @SubscribeMessage('createChannel')
  handleCreateChannel(@MessageBody() data: string) {}

  @SubscribeMessage('newMessage')
  async handleNewMessage(
    @MessageBody() { message, channelId },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.getUser(client);

    if (user) {
      await this.messagesService.addNewMessage({
        message,
        channelId,
        userId: user.userId,
      });
      return { name: user.userName, message };
    }

    return new UnauthorizedException('User not found');
  }

  @SubscribeMessage('newChannel')
  handleNewChannel(@MessageBody() data: string) {}

  @SubscribeMessage('renameChannel')
  handleRenameChannel(@MessageBody() data: string) {}

  @SubscribeMessage('removeChannel')
  handleRemoveChannel(@MessageBody() data: string) {}

  private getUser(client: Socket) {
    return this.authorizedClients?.find(
      (authClient) => authClient.socketId === client.id,
    );
  }
}
