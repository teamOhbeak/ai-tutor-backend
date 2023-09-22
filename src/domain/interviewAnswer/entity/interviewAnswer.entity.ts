import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InterviewQuestionsEntity } from '../../interviewQuestions/entity/interviewQuestions.entity';

@Entity('interview_answer')
export class InterviewAnswer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  questionId: number;

  constructor(answer: string, questionId: number) {
    this.answer = answer;
    this.questionId = questionId;
  }
}
