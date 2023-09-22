import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'follow_up_questions', schema: 'test' })
export class FollowUpQuestions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'question_text',
    type: 'text',
  })
  questionText: string;

  @Column({
    name: 'sequence',
    type: 'int',
  })
  sequence: number;

  @Column({ default: false })
  status: boolean;

  @Column()
  interviewQuestionsId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  constructor(
    questionText: string,
    checkSequence: boolean,
    questionId: number,
  ) {
    this.questionText = questionText;
    this.sequence = checkSequence ? 2 : 1; // checkSequence가 true일 경우2, 아닐 경우 1
    this.interviewQuestionsId = questionId;
  }
}
