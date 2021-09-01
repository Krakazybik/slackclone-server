import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from '../../messages/messages.module';
import { AuthModule } from '../../auth/auth.module';
import { ChannelsModule } from '../channels.module';

@Module({
  providers: [ChatGateway],
  imports: [MessagesModule, AuthModule, ChannelsModule],
  exports: [],
})
export class SocketModule {}
