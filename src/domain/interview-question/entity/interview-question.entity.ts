import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InterviewEntity } from 'src/domain/interview/entity/interview.entity';
import { UserEntity } from '@/domain/user/entity/user.entity';
import { IsEnum } from 'class-validator';
import { QuestionStatus } from './question-status.enum';
import { InterviewQuestionAnswerEntity } from '@/domain/interview-question-answer/entity/interview-question-answer.entity';
import { QuestionType } from './question-type.enum';

@Entity('interview_question')
export class InterviewQuestionEntity {
  @PrimaryGeneratedColumn({
    name: 'question_id',
  })
  questionId: number;

  // @IsEnum(QuestionType)
  // @Column()
  // questionType: QuestionType;

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

  @IsEnum(QuestionStatus)
  @Column()
  status: QuestionStatus;

  @Column({ name: 'interview_id' })
  interviewId: number;

  @ManyToOne(() => InterviewEntity)
  @JoinColumn({ name: 'interview_id' })
  interviewInfo: InterviewEntity;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  startedAt?: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  finishedAt?: Date;

  @OneToOne(() => InterviewQuestionAnswerEntity, (question) => question.question)
  // @JoinColumn({name: 'question_id'})
  answer?: InterviewQuestionAnswerEntity;
}
