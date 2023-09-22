import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './user-status.enum';

@Entity({ name: 'user', schema: 'test' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
  })
  status: UserStatus;
}
