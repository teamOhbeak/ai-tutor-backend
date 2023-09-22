import { InterviewEntity } from '@/domain/interview/entity/interview.entity';
import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
import { InterviewQuestion } from '@/domain/prompt/service/prompt.service';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'interview_answer', schema: 'test' })
export class InterviewAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  interviewQuestionId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  // @ManyToOne(() => InterviewQuestionsEntity, (interviewQuestionId) => interviewQuestionId)
  // @JoinColumn({name: 'interviewQuestionId'})
  // interviewQuestionId: InterviewQuestion

  constructor(answer: string, questionId: number) {
    this.answer = answer;
    this.interviewQuestionId = questionId;
  }
}
