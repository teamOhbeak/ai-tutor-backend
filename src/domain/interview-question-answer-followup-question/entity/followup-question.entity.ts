import { InterviewQuestionAnswerEntity } from '@/domain/interview-question-answer/entity/interview-question-answer.entity';
import { InterviewQuestionEntity } from '@/domain/interview-question/entity/interview-question.entity';
import { QuestionStatus } from '@/domain/questionsBank/entity/questionBank.entity';
import { IsEnum } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FollowUpQuestionAnswerEntity } from './followup-question-answer.entity';

@Entity({
  name: 'followup_question',
  orderBy: {
    questionId: 'DESC',
  },
})
export class FollowUpQuestionEntity {
  @PrimaryGeneratedColumn({
    name: 'followup_question_id',
  })
  questionId: number;

  @Column({
    name: 'main_answer_id',
  })
  mainAnswerId: number;

  @Column({
    name: 'main_question_id',
  })
  mainQuestionId: number;

  @Column({
    name: 'question_text',
    type: 'text',
  })
  questionText: string;

  @IsEnum(QuestionStatus)
  @Column()
  status: QuestionStatus;

  @Column({ name: 'interview_id' })
  interviewId: number;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  @Index()
  startedAt?: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  finishedAt?: Date;

  @ManyToOne(() => InterviewQuestionAnswerEntity)
  @JoinColumn({ name: 'main_answer_id' })
  mainQuestionAnswer: InterviewQuestionAnswerEntity;

  @OneToOne(() => FollowUpQuestionAnswerEntity, (question) => question.question)
  answer?: FollowUpQuestionAnswerEntity;
}
