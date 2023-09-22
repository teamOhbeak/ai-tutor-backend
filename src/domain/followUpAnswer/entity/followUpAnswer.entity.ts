import { InterviewEntity } from '@/domain/interview/entity/interview.entity';
import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
import { InterviewQuestion } from '@/domain/prompt/service/prompt.service';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'follow_up_answer', schema: 'test' })
export class FollowUpAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  followUpQuestionId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  constructor(answer: string, questionId: number) {
    this.answer = answer;
    this.followUpQuestionId = questionId;
  }
}
