import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './channels/channels.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { UserRole } from './users/user-roles.model';
import { Role } from './roles/roles.model';
import { UserChannels } from './users/user-channels.model';
import { Channel } from './channels/channels.model';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    ChannelsModule,
    RolesModule,
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Channel, UserRole, UserChannels],
      autoLoadModels: true,
    }),
    RolesModule,
  ],
})
export class AppModule {}
