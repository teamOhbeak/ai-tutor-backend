import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm";

@Entity('t_qna_room')
export class QnaRoomEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column()
  deleted: boolean;
}