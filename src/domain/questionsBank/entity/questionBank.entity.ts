import { StackType } from '@/domain/interview/entity/interview.entity';
import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
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

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => InterviewQuestionsEntity, (question) => question.interview)
  questions: InterviewQuestionsEntity[];
}
