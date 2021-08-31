import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserRole } from './user-roles.model';
import { Role } from 'src/roles/roles.model';
import { UserChannels } from './user-channels.model';
import { RolesService } from '../roles/roles.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    RolesService,
    SequelizeModule.forFeature([User, Role, UserRole, UserChannels]),
  ],
})
export class UsersModule {}
