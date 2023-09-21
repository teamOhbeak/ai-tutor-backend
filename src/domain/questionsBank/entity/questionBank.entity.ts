import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StacktType } from '../../../interface/interview/response/my-interview-detail.response';

export enum QuestionStatus {
  PENDING = 0,
  APPROVED = 1,
  DELETED = 2,
}

@Entity()
export class QuestionBank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  stack: StacktType;

  @Column({
    type: 'varchar',
  })
  question: string;

  @Column({
    type: 'int',
  })
  status: QuestionStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
