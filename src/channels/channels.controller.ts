import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Channel } from './channels.model';

@ApiTags('Channels')
@Controller('channels')
export class ChannelsController {
  constructor(private channelService: ChannelsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all available channels' })
  @ApiResponse({ status: 200, type: [Channel] })
  @Get()
  async getAllChannels() {
    const channels = await this.channelService.getAllChannels();
    return { channels };
  }

  @ApiOperation({ summary: 'Create new channel' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createChannel(@Body() body: CreateChannelDto) {
    return this.channelService.createChannel(body);
  }
}
