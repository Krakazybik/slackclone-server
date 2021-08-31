import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Channel } from '../channels/channels.model';
import { User } from './users.model';

@Table({ tableName: 'user_channels', updatedAt: false, createdAt: false })
export class UserChannels extends Model<UserChannels> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Channel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  channelId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
}
