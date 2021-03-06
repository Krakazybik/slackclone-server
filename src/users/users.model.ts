import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-roles.model';
import { Role } from '../roles/roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'User unique identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.cm', description: 'User e-mail address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'User ban status' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'cheats', description: 'User ban reason' })
  @Column({ type: DataType.STRING })
  banReason: string;

  @ApiProperty({ example: '2', description: 'User selected channel id' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  currentChannel: number;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
