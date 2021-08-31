import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { UserChannels } from '../users/user-channels.model';
import { User } from '../users/users.model';

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService],
  imports: [SequelizeModule.forFeature([User, Channel, UserChannels])],
})
export class ChannelsModule {}
