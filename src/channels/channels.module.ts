import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { UserChannels } from '../users/user-channels.model';
import { User } from '../users/users.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Channel, UserChannels]),
  ],
  exports: [ChannelsService],
})
export class ChannelsModule {}
