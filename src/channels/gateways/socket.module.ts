import { Module } from '@nestjs/common';
import { ChannelGateway } from './сhannels.gateway';
import { MessagesModule } from '../../messages/messages.module';
import { MessagesService } from '../../messages/messages.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from '../../auth/auth.module';

@Module({
  providers: [ChannelGateway],
  imports: [MessagesModule, AuthModule],
  exports: [],
})
export class SocketModule {}
