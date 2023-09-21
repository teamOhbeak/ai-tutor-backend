import { Type } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./user-status";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;
 
  @Column({
    type: 'enum',
    enum: UserStatus
  })
  status: UserStatus;
}
