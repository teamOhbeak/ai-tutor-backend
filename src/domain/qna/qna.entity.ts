import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QnaRoom } from '../qna-room/qna-room.entity';

@Entity()
export class Qna {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    type: 'varchar',
    nullable: true,
  })
  question: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  answer: boolean;

  @Column({
    type: 'int',
  })
  sequence: number;

  @ManyToOne((type) => QnaRoom, (qnaRoom) => QnaRoom.qnas)
  qnaRoom!: QnaRoom;
}
