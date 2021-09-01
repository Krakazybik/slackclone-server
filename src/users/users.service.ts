import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Role } from 'src/roles/roles.model';
import { AddUserChannelDto } from './dto/add-channel.dto';
import { ChannelsService } from '../channels/channels.service';
import { Channel } from 'src/channels/channels.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private channelsService: ChannelsService,
  ) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getByRoleName('user');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async updateUserRole(dto: AddRoleDto) {
    const user: User = await this.userRepository.findByPk(dto.userId);
    const role: Role = await this.roleService.getByRoleName(dto.role);
    if (user && role) {
      await user.$add('roles', role.id);
      return dto;
    }
    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND);
  }

  async addUserChannel(dto: AddUserChannelDto) {
    const user: User = await this.userRepository.findByPk(dto.userId);
    const channel: Channel = await this.channelsService.getChannelById(
      dto.userId,
    );

    if (user && channel) {
      await user.$add('channels', channel.id);
      return dto;
    }

    throw new HttpException('User or Channel not found', HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDto) {
    const user: User = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.reason;
      await user.save();
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user) return user;
    throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
  }
}
