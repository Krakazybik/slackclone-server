import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { CreateChannelDto } from './dto/create-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel) private channelRepository: typeof Channel,
  ) {}

  async createChannel(dto: CreateChannelDto) {
    const channel = await this.channelRepository.create(dto);
    return channel;
  }

  async getAllChannels() {
    const channels = await this.channelRepository.findAll();
    return channels;
  }
}
