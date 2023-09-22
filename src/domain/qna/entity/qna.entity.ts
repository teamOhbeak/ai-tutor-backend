import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QnaRoom } from '../../qna-room/entity/qna-room.entity';
import { QnaResponse } from '@/interface/qna-room-qna/response/qna-response';

@Entity({ name: 'qna', schema: 'test' })
export class Qna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  question?: string;

  @Column({ type: 'text' })
  answer?: string;

  @Column()
  sequence: number;

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

  @ManyToOne((type) => QnaRoom)
  qnaRoom!: QnaRoom;

  toResponse(): QnaResponse {
    return new QnaResponse(this.id, this.sequence, this.question, this.answer);
  }

  constructor(
    question: string,
    answer: string,
    sequence: number,
    qnaRoom: QnaRoom,
  ) {
    this.question = question;
    this.answer = answer;
    this.sequence = sequence;
    this.qnaRoom = qnaRoom;
  }
}
