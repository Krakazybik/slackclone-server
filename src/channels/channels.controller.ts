import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private channelService: ChannelsService) {}

  @Get()
  async getAllChannels() {
    return this.channelService.getAllChannels();
  }

  @Post()
  async createChannel(@Body() body: CreateChannelDto) {
    return this.channelService.createChannel(body);
  }
}
