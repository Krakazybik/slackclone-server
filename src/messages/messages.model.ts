import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface MessageCreationAttrs {
  userId: number;
  channelId: number;
  message: string;
}

@Table({ tableName: 'messages', updatedAt: false })
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  channelId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  message: string;
}
