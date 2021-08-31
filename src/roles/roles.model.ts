import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRole } from 'src/users/user-roles.model';

interface RoleCreationAttrs {
  role: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Role unique indent' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'User role name' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  role: string;

  @ApiProperty({
    example: 'Basic user role',
    description: 'User role description',
  })
  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
