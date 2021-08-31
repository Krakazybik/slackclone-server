import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserChannels } from 'src/users/user-channels.model';

interface ChannelCreationAttrs {
  name: string;
  password?: string;
}

@Table({ tableName: 'channels' })
export class Channel extends Model<Channel, ChannelCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Channel unique identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'stories', description: 'Channel name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'Password access for channel',
  })
  @Column({ type: DataType.STRING })
  password: string;

  @BelongsToMany(() => User, () => UserChannels)
  owners: User[];
}
