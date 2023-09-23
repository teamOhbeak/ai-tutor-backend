import { StackType } from '@/domain/interview/entity/stack-type.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  stack: StackType;

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

  @Column({ type: 'timestamp', default: null })
  updatedAt: Date;

  // @OneToMany(() => InterviewQuestionsEntity, (question) => question.interview)
  // questions: InterviewQuestionsEntity[];
}
