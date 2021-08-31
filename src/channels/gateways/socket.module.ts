import { Module } from '@nestjs/common';
import { ChannelGateway } from './сhannels.gateway';
import { MessagesModule } from '../../messages/messages.module';

@Module({
  providers: [ChannelGateway],
  imports: [MessagesModule],
})
export class SocketModule {}
