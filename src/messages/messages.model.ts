import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface MessageCreationAttrs {
  userId: number;
  channelId: number;
  message: string;
}

@Table({ tableName: 'messages', updatedAt: false })
export class Message extends Model<Message, MessageCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Message unique ident' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'User unique ident' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({ example: 'admin', description: 'User name' })
  @Column({ type: DataType.STRING, allowNull: false })
  userName: string;

  @ApiProperty({ example: '1', description: 'Channel unique ident' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  channelId: number;

  @ApiProperty({ example: 'Hello', description: 'Message text' })
  @Column({ type: DataType.STRING, allowNull: false })
  message: string;
}
