import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserRole } from './user-roles.model';
import { Role } from 'src/roles/roles.model';
import { UserChannels } from './user-channels.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    RolesModule,
    SequelizeModule.forFeature([User, Role, UserRole, UserChannels]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
