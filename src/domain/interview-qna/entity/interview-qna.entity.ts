import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerStatus } from './answer-status.enum';
import { QuestionStatus } from './question-status.enum';
import { IsEnum } from 'class-validator';
import { InterviewEntity } from '@/domain/interview/entity/interview.entity';

@Entity('interview_qna')
export class InterviewQnaEntity {
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
    name: 'is_pass',
    nullable: true,
  })
  @IsEnum(AnswerStatus)
  isPass: AnswerStatus;

  @Column({
    name: 'main_question_id',
  })
  mainQuestionId: number;

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
    name: 'finished_at',
    type: 'timestamp',
    nullable: true,
  })
  finishedAt?: Date;

  @ManyToOne(() => InterviewEntity)
  @JoinColumn({
    name: 'interview_id',
  })
  interviewInfo: InterviewEntity;
}
