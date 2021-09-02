import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { MessagesService } from '../../messages/messages.service';
import { ChannelsService } from '../channels.service';
import { SocketRenameChannelDto } from './dto/socket-rename-channel.dto';
import { Channel } from '../channels.model';
import { UsersService } from '../../users/users.service';
import { User } from 'src/users/users.model';

interface IAuthorizedClient {
  socketId: string;
  userId: number;
  userName: string;
}
@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private messagesService: MessagesService,
    private channelsService: ChannelsService,
    private usersService: UsersService,
  ) {}

  private authorizedClients: Array<IAuthorizedClient> = [];
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  async handleConnection(client: Socket) {
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

  @SubscribeMessage('joinChannel')
  async handleJoinChannel(
    @MessageBody('channelId') channelId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.getUser(client);
    const channel: Channel = await this.channelsService.getChannelById(
      channelId,
    );

    if (channel && user) {
      client.join(channel.name);
      this.server.to(channel.name).emit('joinChannel', {
        join: `Пользователь - ${user.userName} -  присоединился к каналу`,
      });
      return HttpStatus.OK;
    }

    throw new WsException('Channel not found');
  }

  @SubscribeMessage('newMessage')
  async handleNewMessage(
    @MessageBody() { message },
    @ConnectedSocket() client: Socket,
  ) {
    const authorizedUser: IAuthorizedClient = this.getUser(client);
    if (authorizedUser) {
      const user: User = await this.usersService.getUserById(
        authorizedUser.userId,
      );
      const channel: Channel = await this.channelsService.getChannelById(
        user.currentChannel,
      );

      await this.messagesService.addNewMessage({
        message,
        channelId: channel.id,
        userId: user.id,
      });

      const msg = { userId: user.id, name: user.email, message };

      this.server.to(channel.name).emit('newMessage', msg);
    } else throw new WsException('User not found');
  }

  @SubscribeMessage('newChannel')
  async handleCreateChannel(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user: IAuthorizedClient = this.getUser(client);
    if (user) {
      const channel = await this.channelsService.createChannel({
        name,
        ownerId: user.userId,
      });
      this.server.emit('newChannel', channel);
    }
    throw new WsException('User not found');
  }

  @SubscribeMessage('renameChannel')
  async handleRenameChannel(
    @MessageBody() { channelId, name }: SocketRenameChannelDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user: IAuthorizedClient = this.getUser(client);
    if (user) {
      const channel = await this.channelsService.renameChannel({
        userId: user.userId,
        channelId,
        name,
      });
      this.server.emit('renameChannel', channel);
    }

    throw new WsException('User not found');
  }

  @SubscribeMessage('removeChannel')
  async handleRemoveChannel(
    @MessageBody() { channelId }: SocketRenameChannelDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.getUser(client);
    if (user) {
      return await this.channelsService.removeChannel({
        channelId,
        userId: user.userId,
      });
    }
  }

  private getUser(client: Socket): IAuthorizedClient {
    return this.authorizedClients?.find(
      (authClient) => authClient.socketId === client.id,
    );
  }
}
