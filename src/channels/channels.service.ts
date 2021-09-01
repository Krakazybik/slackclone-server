import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { CreateChannelDto } from './dto/create-channel.dto';
import { RenameChannelDto } from './dto/rename-channel.dto';
import { RemoveChannelDto } from './dto/remove-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel) private channelRepository: typeof Channel,
  ) {}

  async createChannel(dto: CreateChannelDto) {
    const channel: Channel = await this.channelRepository.create(dto);
    await channel.$add('owners', dto.ownerId);
    return channel;
  }

  async getChannelById(id: number) {
    const channel: Channel = await this.channelRepository.findByPk(id);
    return channel;
  }

  async renameChannel(dto: RenameChannelDto) {
    const channel: Channel = await this.channelRepository.findByPk(
      dto.channelId,
    );
    if (channel && channel?.owners.some((owner) => owner.id === dto.userId)) {
      channel.name = dto.name;
      await channel.save();
      return channel;
    }
    throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
  }

  async removeChannel(dto: RemoveChannelDto) {
    const channel: Channel = await this.channelRepository.findByPk(
      dto.channelId,
      { include: { all: true } },
    );

    if (channel?.owners?.find((owner) => owner.id === dto.userId)) {
      await channel.destroy();
      return HttpStatus.OK;
    }

    return new UnauthorizedException('You must be channel owner.');
  }

  async getAllChannels() {
    const channels: Array<Channel> = await this.channelRepository.findAll();
    return channels;
  }
}
