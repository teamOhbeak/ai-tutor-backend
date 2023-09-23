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
  })
  userId: number;

  @Column({
    name: 'question_text',
  })
  questionText: string;

  @Column({
    name: 'answer_text',
  })
  answerText: string;

  @Column()
  @IsEnum(QuestionStatus)
  status: QuestionStatus;

  @Column({
    name: 'answer_yn',
    nullable: true,
  })
  @IsEnum(AnswerStatus)
  isPass: AnswerStatus;

  @Column({
    name: 'main_question_id',
  })
  mainQuestionId: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  record: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'started_at',
    type: 'timestamp',
    nullable: true,
  })
  startedAt?: Date;

  @Column({
    name: 'started_at',
    type: 'timestamp',
    nullable: true,
  })
  finishedAt?: Date;
}
