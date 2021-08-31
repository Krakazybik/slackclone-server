import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
  imports: [AuthModule, SequelizeModule.forFeature([Message])],
  exports: [MessagesService],
})
export class MessagesModule {}
