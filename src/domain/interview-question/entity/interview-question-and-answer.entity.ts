import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsBoolean, IsEnum } from 'class-validator';
import { InterviewStatus } from '../../interview/entity/insterview-status.enum';
import { AnswerStatus } from './answer-status.enum';
import { QuestionStatus } from './question-status.enum';

@Entity('interview_question_and_answer')
export class InterviewQuestionAndAnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'interview_id',
  })
  interviewId: number;

  @Column({
    name: 'user_id',
    default: 1,
  })
  userId: number;

  @Column({
    name: 'question_text',
    default: '',
  })
  questionText: string;

  @Column({
    name: 'answer_text',
    default: '',
  })
  answerText: string;

  @Column()
  @IsEnum(QuestionStatus)
  status: QuestionStatus;

  @Column({
    name: 'is_pass',
    nullable: true,
  })
  @IsEnum(AnswerStatus)
  isPass: AnswerStatus;

  @Column({
    name: 'main_question_id',
    default: null,
  })
  mainQuestionId: number;

  @Column({
    name: 'started_at',
    type: 'timestamp',
    nullable: true,
  })
  startedAt?: Date;

  @Column({
    name: 'finished_at',
    type: 'timestamp',
    nullable: true,
  })
  finishedAt?: Date;
}
